import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { SpotifyApi } from "@spotify/web-api-ts-sdk";

export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url);
    const code = searchParams.get("code");
    const next = searchParams.get("next") ?? "/";

    if (code) {
        const supabase = createClient();
        const { error } = await supabase.auth.exchangeCodeForSession(code);

        if (!error) {
            const {
                data: { session },
            } = await supabase.auth.getSession();
            const {
                data: { user },
            } = await supabase.auth.getUser();

            if (session?.provider_token && session?.provider_refresh_token) {
                try {
                    const spotify = SpotifyApi.withAccessToken(
                        process.env.SPOTIFY_CLIENT_ID!,
                        {
                            access_token: session.provider_token,
                            refresh_token: session.provider_refresh_token,
                            token_type: session.token_type,
                            expires_in: session.expires_in,
                        },
                    );

                    const currentUser = await spotify.currentUser.profile();
                    const isPremium = currentUser.product === "premium";
                    const market = currentUser.country;

                    await supabase.auth.updateUser({
                        data: {
                            spotify_premium: isPremium,
                            ...(!user?.user_metadata?.region_preference
                                ? { region_preference: market }
                                : {}),
                        },
                    });
                } catch (error) {
                    console.error("Error checking Spotify status:", error);
                    return failWithMessage(
                        "An error occurred while checking Spotify status.",
                    );
                }
            } else {
                return failWithMessage("No Spotify token found.");
            }

            return redirectToNext();
        }
    }

    return failWithMessage("Could not authenticate user.");

    async function failWithMessage(message: string) {
        const supabase = createClient();
        await supabase.auth.signOut();
        return NextResponse.redirect(
            `${origin}/welcome?message=${encodeURIComponent(message)}`,
        );
    }

    function redirectToNext() {
        const forwardedHost = request.headers.get("x-forwarded-host");
        const isLocalEnv = process.env.NODE_ENV === "development";

        if (isLocalEnv) {
            return NextResponse.redirect(`${origin}${next}`);
        } else if (forwardedHost) {
            return NextResponse.redirect(`https://${forwardedHost}${next}`);
        } else {
            return NextResponse.redirect(`${origin}${next}`);
        }
    }
}
