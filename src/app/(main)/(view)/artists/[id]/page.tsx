import {createClient} from "@/utils/supabase/server";
import {Artist, SpotifyApi} from "@spotify/web-api-ts-sdk";
import {notFound} from "next/navigation";
import {Separator} from "@/components/ui/separator";
import {SpotifyImage} from "@/components/spotify/images";
import {ItemCarousel} from "@/components/spotify/carousels";
import {DesktopFlex, MobileBlock} from "@/components/devices";
import {ItemDialog} from "@/components/spotify/dialogs";
import {DialogTrigger} from "@/components/ui/dialog";
import {ArtistMenu} from "@/components/spotify/menus";

export default async function ArtistView({ params }: {
    params: { id: string }
}) {
    if(params.id.length !== 22) {
        console.error(`Invalid Base62 ID: ${params.id}`);
        return notFound();
    }

    const supabase = createClient();
    const {data: {session}} = await supabase.auth.getSession()

    if(!session?.provider_token || !session.provider_refresh_token) {
        return null;
    }

    const spotify = SpotifyApi.withAccessToken(process.env.SPOTIFY_CLIENT_ID!, {
        access_token: session?.provider_token,
        refresh_token: session?.provider_refresh_token,
        token_type: session?.token_type,
        expires_in: session?.expires_in,
    }, {
        fetch: (input, init) => {
            return fetch(input, {
                ...init,
                // next: {
                //     revalidate: 300
                // }
            })
        }
    })

    const artist = await spotify.artists.get(params.id)
        .catch(error => {
            console.error(error)
            return notFound();
        });

    const artistAlbums = await spotify.artists.albums(params.id, 'album,single', undefined, 50);
    const artistTopTracks = await spotify.artists.topTracks(params.id, 'MK')

    const artistSimilar = {
        artists: Array.from({ length: 10 }, (_, i) => ({
            id: `mock-artist-${i + 1}`,
            name: `Artist ${i + 1}`,
            type: "artist",
            uri: `spotify:artist:mock-artist-${i + 1}`,
            href: "",
            external_urls: { spotify: "" },
            images: [
                { url: "https://placehold.co/250x250", width: 640, height: 640 }
            ],
            followers: { href: "", total: 0 },
            genres: [], // string[]
            popularity: 0
        })) as Artist[]
    };

    return(
        <>
            <ItemDialog items={artistSimilar.artists} textData={{
                default: `Similar to ${artist.name}`,
                empty: "No similar artists found."
            }}>
                <div
                    className="flex-1 flex"
                    style={{
                        backgroundImage: `url(${artist.images[0]?.url || '/placeholder.png'})`,
                        backgroundPosition: 'center'
                    }}
                >
                    <div
                        className="flex-1 flex flex-row justify-center items-center p-8 gap-10 md:gap-14 bg-black/25 backdrop-blur-2xl backdrop-saturate-125 backdrop-contrast-125">
                        <ArtistMenu artist={artist} className="flex-1 md:flex-none flex justify-center items-center min-w-32 md:max-w-64">
                            <SpotifyImage imgData={{
                                src: artist.images[0]?.url,
                                alt: artist.name,
                                width: artist.images[0]?.width || 640,
                                height: artist.images[0]?.height || 640
                            }}
                                          className="rounded-full w-full shadow-[0_3px_9px_-2px_rgba(0,0,0,0.7)]"
                            />
                        </ArtistMenu>
                        <div className="flex flex-col gap-1 text-zinc-100">
                            <span
                                className="text-xl md:text-3xl leading-5 font-extrabold drop-shadow-[0_2.5px_1.5px_rgba(0,0,0,0.8)]">{artist.name}
                            </span>
                            <span
                                className="text-lg md:text-2xl leading-5 font-base pb-3 md:pb-6 drop-shadow-[0_2px_1.5px_rgba(0,0,0,0.8)]">{artist.followers.total.toLocaleString()} followers
                            </span>
                            <DialogTrigger asChild>
                                <button
                                    className="w-fit text-sm md:text-base leading-5 drop-shadow-[0_2px_1.5px_rgba(0,0,0,0.8)] text-start hover:underline">
                                    Similar artists
                                </button>
                            </DialogTrigger>
                        </div>
                    </div>
                </div>
                <Separator/>
                <DesktopFlex className="h-80 flex flex-row justify-center items-center">
                    <div className="w-[49.9%] py-4">
                        {
                            artistTopTracks.tracks.length > 0 ?
                                <>
                                    <span className="inline-block text-3xl font-bold pl-12 pb-4 drop-shadow-md">
                                        {`${artist.name}${artist.name.slice(-1).toLowerCase() === 's' ? "'" : "'s"} top tracks`}
                                    </span>
                                    <ItemCarousel items={artistTopTracks.tracks} slideVariant="half"/>
                                </>
                                :
                                <div className="w-full h-full flex content-center px-4">
                                    <span className="text-3xl font-bold drop-shadow-md">No top tracks found</span>
                                </div>
                        }
                    </div>
                    <Separator orientation="vertical"/>
                    <div className="w-[49.9%] py-4">
                        {
                            artistAlbums.items.length > 0 ?
                                <>
                                    <span className="inline-block text-3xl font-bold pl-12 pb-4 drop-shadow-md">
                                        {`${artist.name}${artist.name.slice(-1).toLowerCase() === 's' ? "'" : "'s"} albums`}
                                    </span>
                                    <ItemCarousel items={artistAlbums.items} slideVariant="half"/>
                                </>
                                :
                                <div className="w-full h-full flex content-center px-4">
                                    <span className="text-3xl font-bold drop-shadow-md">No albums found</span>
                                </div>
                        }
                    </div>
                </DesktopFlex>
                <MobileBlock>
                    <div className="p-3 md:p-4">
                        {
                            artistTopTracks.tracks.length > 0 ?
                                <>
                                    <span className="inline-block text-2xl md:text-3xl font-bold pb-3 drop-shadow-md">
                                        {`${artist.name}${artist.name.slice(-1).toLowerCase() === 's' ? "'" : "'s"} top tracks`}
                                    </span>
                                    <ItemCarousel items={artistTopTracks.tracks} slideVariant="full"/>
                                </>
                                :
                                <span className="text-3xl font-bold drop-shadow-md">No top tracks found</span>
                        }
                    </div>
                    <Separator/>
                    <div className="p-3 pb-6 md:pb-4 md:p-4">
                        {
                            artistAlbums.items.length > 0 ?
                                <>
                                    <span className="inline-block text-2xl md:text-3xl font-bold pb-3 drop-shadow-md">
                                        {`${artist.name}${artist.name.slice(-1).toLowerCase() === 's' ? "'" : "'s"} albums`}
                                    </span>
                                    <ItemCarousel items={artistAlbums.items} slideVariant="full"/>
                                </>
                                :
                                <span className="text-3xl font-bold drop-shadow-md">No albums found</span>
                        }
                    </div>
                </MobileBlock>
            </ItemDialog>
        </>
    );
}