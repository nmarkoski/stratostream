"use server";

import { createClient } from "@/utils/supabase/server";
import { SpotifyApi } from "@spotify/web-api-ts-sdk";

export async function playSpotifyContent({
    contextUri,
    offset,
    trackUris,
}: {
    contextUri?: string;
    offset?: number;
    trackUris?: string[];
}) {
    const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error("No user found");

    if (!user.user_metadata?.spotify_premium) {
        console.error(
            "User does not have premium Spotify subscription:",
            user.user_metadata,
        );
        return {
            message: "Premium Spotify subscription required",
            description:
                "The playback of content requires a premium Spotify subscription. If you have a premium subscription, please reauthenticate.",
        };
    }

    if (!user.user_metadata?.spotify_device_id) {
        console.error("No device ID set for user:", user.user_metadata);
        return {
            message: "No device ID set",
            description:
                "The device ID for the player has not been set. This is likely due to the player failing to initialize. Please refresh the page or reauthenticate.",
        };
    }

    const {
        data: { session },
    } = await supabase.auth.getSession();
    if (!session?.provider_token || !session?.provider_refresh_token) {
        throw new Error("No Spotify session found");
    }

    const spotify = SpotifyApi.withAccessToken(process.env.SPOTIFY_CLIENT_ID!, {
        access_token: session.provider_token,
        refresh_token: session.provider_refresh_token,
        token_type: session.token_type,
        expires_in: session.expires_in,
    });

    const devices = await spotify.player.getAvailableDevices();
    const device = devices.devices.find(
        (device) => device.id === user.user_metadata.spotify_device_id,
    );
    if (!device?.id)
        return {
            message: "Device ID stale",
            description:
                "The device ID stored for the player is not valid. This is likely due to the player failing to initialize. Please refresh the page or reauthenticate.",
        };

    try {
        await spotify.player.startResumePlayback(
            device.id,
            contextUri,
            trackUris,
            offset !== undefined ? { position: offset } : undefined,
        );
    } catch (error) {
        console.error("Error starting playback:", error);
        return {
            message: "Failed to start playback",
            description:
                "The playback of the selected content has failed for an unknown reason.",
        };
    }
}

export async function changeSpotifyPlaybackSettings({
    shuffle,
    repeat,
}: {
    shuffle?: boolean;
    repeat?: "off" | "track" | "context";
}) {
    const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error("No user found");

    if (!user.user_metadata?.spotify_premium) {
        console.error(
            "User does not have premium Spotify subscription:",
            user.user_metadata,
        );
        return {
            message: "Premium Spotify subscription required",
            description:
                "Changing playback settings requires a premium Spotify subscription. If you have a premium subscription, please reauthenticate.",
        };
    }

    const {
        data: { session },
    } = await supabase.auth.getSession();
    if (!session?.provider_token || !session?.provider_refresh_token) {
        throw new Error("No Spotify session found");
    }

    const spotify = SpotifyApi.withAccessToken(process.env.SPOTIFY_CLIENT_ID!, {
        access_token: session.provider_token,
        refresh_token: session.provider_refresh_token,
        token_type: session.token_type,
        expires_in: session.expires_in,
    });

    try {
        if (shuffle !== undefined) {
            await spotify.player.togglePlaybackShuffle(shuffle);
        }

        if (repeat !== undefined) {
            await spotify.player.setRepeatMode(repeat);
        }
    } catch (error) {
        console.error("Error changing playback settings:", error);
        return {
            message: "Failed to change playback settings",
            description:
                "An error occurred while trying to update the playback settings.",
        };
    }
}
