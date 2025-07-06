import { createClient } from "@/utils/supabase/server";
import { SpotifyApi } from "@spotify/web-api-ts-sdk";
import { notFound } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { SpotifyImage } from "@/components/spotify/images";
import { msToDurationView } from "@/utils/msToDuration";
import { ItemCarousel } from "@/components/spotify/carousels";
import { SimplifiedTrackCard } from "@/components/spotify/cards";
import Link from "next/link";
import { AlbumMenu, ArtistMenu } from "@/components/spotify/menus";

export default async function AlbumView({
    params,
}: {
    params: { id: string };
}) {
    if (params.id.length !== 22) {
        console.error(`Invalid Base62 ID: ${params.id}`);
        return notFound();
    }

    const supabase = createClient();
    const {
        data: { session },
    } = await supabase.auth.getSession();

    if (!session?.provider_token || !session.provider_refresh_token) {
        return null;
    }

    const spotify = SpotifyApi.withAccessToken(
        process.env.SPOTIFY_CLIENT_ID!,
        {
            access_token: session?.provider_token,
            refresh_token: session?.provider_refresh_token,
            token_type: session?.token_type,
            expires_in: session?.expires_in,
        },
        {
            fetch: (input, init) => {
                return fetch(input, {
                    ...init,
                    // next: {
                    //     revalidate: 300
                    // }
                });
            },
        },
    );

    const album = await spotify.albums.get(params.id).catch((error) => {
        console.error(error);
        return notFound();
    });

    return (
        <>
            <div
                className="flex-1 flex"
                style={{
                    backgroundImage: `url(${album.images[0]?.url || "/placeholder.png"})`,
                    backgroundPosition: "center",
                }}
            >
                <div className="flex-1 flex flex-row justify-center items-center p-8 gap-10 md:gap-14 bg-black/25 backdrop-blur-2xl backdrop-saturate-125 backdrop-contrast-125">
                    <AlbumMenu
                        album={album}
                        className="flex-1 md:flex-none flex justify-center items-center min-w-32 md:max-w-64"
                    >
                        <SpotifyImage
                            imgData={{
                                src: album.images[0]?.url,
                                alt: album.name,
                                width: album.images[0]?.width || 640,
                                height: album.images[0]?.height || 640,
                            }}
                            className="rounded-lg w-full shadow-[0_3px_9px_-2px_rgba(0,0,0,0.7)]"
                        />
                    </AlbumMenu>
                    <div className="flex flex-col gap-1 text-zinc-100">
                        <span className="text-xl md:text-3xl leading-5 font-extrabold drop-shadow-[0_2.5px_1.5px_rgba(0,0,0,0.8)]">
                            {album.name}
                        </span>
                        <span className="text-lg md:text-2xl leading-5 font-base pb-2 md:pb-6 drop-shadow-[0_2px_1.5px_rgba(0,0,0,0.8)]">
                            {album.artists.map((artist, index) => {
                                return (
                                    <ArtistMenu key={artist.id} artist={artist}>
                                        <div className="inline-block">
                                            <Link
                                                href={`/artists/${artist.id}`}
                                            >
                                                <span className="hover:underline">
                                                    {artist.name}
                                                </span>
                                            </Link>
                                            <span className="whitespace-pre">
                                                {index <
                                                album.artists.length - 1
                                                    ? ", "
                                                    : ""}
                                            </span>
                                        </div>
                                    </ArtistMenu>
                                );
                            })}
                        </span>
                        <span className="text-sm md:text-base drop-shadow-[0_2px_1.5px_rgba(0,0,0,0.8)]">
                            {album.release_date.slice(0, 4)}
                        </span>
                        <span className="text-sm md:text-base drop-shadow-[0_2px_1.5px_rgba(0,0,0,0.8)]">
                            {`${album.total_tracks} track${album.total_tracks > 1 ? "s" : ""}`}
                        </span>
                        <span className="text-sm md:text-base drop-shadow-[0_2px_1.5px_rgba(0,0,0,0.8)]">
                            {msToDurationView(
                                album.tracks.items.reduce((acc, track) => {
                                    return acc + track.duration_ms;
                                }, 0),
                            )}
                        </span>
                    </div>
                </div>
            </div>
            <Separator />
            {album.album_type == "single" ? (
                <div className="h-60 md:h-80 flex justify-center items-center p-3 md:p-4">
                    <div className="flex justify-center items-center">
                        <SimplifiedTrackCard
                            track={album.tracks.items[0]}
                            index={1}
                            context={album.uri}
                            className="w-[9.6rem] md:w-[12rem]"
                        />
                    </div>
                </div>
            ) : (
                <div className="h-60 md:h-80 content-center p-3 md:p-4">
                    <ItemCarousel
                        items={album.tracks.items}
                        context={album.uri}
                        slideVariant="full"
                    />
                </div>
            )}
        </>
    );
}
