import {createClient} from "@/utils/supabase/server";
import {SpotifyApi} from "@spotify/web-api-ts-sdk";
import {Separator} from "@/components/ui/separator";
import {ItemCarousel} from "@/components/spotify/carousels";
import {Disc, MicVocal, Music} from "lucide-react";
import {DesktopFlex, MobileBlock} from "@/components/devices";
import chunkArray from "@/utils/chunkArray";
import getPlaylistIdFromRegion from "@/utils/spotify/getPlaylistIdFromRegion";

export default async function Home() {
    const supabase = createClient();
    const {data: {session}} = await supabase.auth.getSession()
    const {data: {user}} = await supabase.auth.getUser();

    if (!session?.provider_token || !session.provider_refresh_token) return null;

    const spotify = SpotifyApi.withAccessToken(process.env.SPOTIFY_CLIENT_ID!, {
        access_token: session?.provider_token,
        refresh_token: session?.provider_refresh_token,
        token_type: session?.token_type,
        expires_in: session?.expires_in,
    }, {
        fetch: (input, init) => {
            return fetch(input, {
                ...init,
                next: {
                    tags: ['region']
                }
            })
        }
    });

    // const currentUser = await spotify.currentUser.profile();
    // const currentUserMarket = currentUser.country as Market;

    const top50PlaylistID = await getPlaylistIdFromRegion(user?.user_metadata.region_preference);

    const top50Playlist = await spotify.playlists.getPlaylistItems(top50PlaylistID, undefined, undefined, 50);

    const topTracks = top50Playlist.items.map(item => item.track);

    const albumIdChunks = chunkArray([...new Set(topTracks.map(track => track.album.id))], 20);
    const artistIdChunks = chunkArray([...new Set(topTracks.map(track => track.artists.map(artist => artist.id)).flat())], 50)

    const [topAlbumsUnsorted, topArtistsUnsorted] = await Promise.all([
        Promise.all(
            albumIdChunks.map(async (albumIdChunk) => {
                return await spotify.albums.get(albumIdChunk, undefined);
            })
        ),
        Promise.all(
            artistIdChunks.map(async (artistIdChunk) => {
                return await spotify.artists.get(artistIdChunk);
            })
        )
    ]);

    const topAlbums = topAlbumsUnsorted
        .flat()
        .filter(album => album.album_type !== 'single')
        .sort((a, b) => b.popularity - a.popularity);

    const topArtists = topArtistsUnsorted
        .flat()
        .sort((a, b) => b.popularity - a.popularity);

    return (
        <>
            <div className="p-3 pb-4 md:p-0 md:content-center md:h-[51%]">
                <div className="flex flex-row items-center pl-2 pb-4 md:pl-10 md:pb-4 drop-shadow-md">
                    <Music strokeWidth={3} className="mr-2 h-7 w-7"/>
                    <span className="text-3xl font-bold pl-2">
                        Top tracks
                    </span>
                </div>
                <ItemCarousel items={topTracks} context={`spotify:playlist:${top50PlaylistID}`} slideVariant="full"/>
            </div>
            <Separator/>
            <DesktopFlex className="h-[49%] flex-row justify-center items-center">
                <div className="w-[49.9%]">
                    <div className="flex flex-row items-center pl-10 pb-4 drop-shadow-md">
                        <Disc strokeWidth={3} className="mr-2 h-7 w-7"/>
                        <span className="text-3xl font-bold pl-2">
                            Top albums
                        </span>
                    </div>
                    <ItemCarousel items={topAlbums.slice(0, 22)} slideVariant="half"/>
                </div>
                <Separator orientation="vertical"/>
                <div className="w-[49.9%]">
                    <div className="flex flex-row items-center pl-10 pb-4 drop-shadow-md">
                        <MicVocal strokeWidth={3} className="mr-2 h-7 w-7"/>
                        <span className="text-3xl font-bold pl-2">
                            Top artists
                        </span>
                    </div>
                    <ItemCarousel items={topArtists.slice(0, 22)} slideVariant="half"/>
                </div>
            </DesktopFlex>
            <MobileBlock>
                <div className="p-3 pb-4 md:p-0 md:pt-8 md:pb-11">
                    <div className="flex flex-row items-center pl-2 pb-4 md:pl-10 md:pb-4 drop-shadow-md">
                        <Disc strokeWidth={3} className="mr-2 h-7 w-7"/>
                        <span className="text-3xl font-bold pl-2">
                            Top albums
                        </span>
                    </div>
                    <ItemCarousel items={topAlbums.slice(0, 22)} slideVariant="full"/>
                </div>
                <Separator/>
                <div className="p-3 pb-4 md:p-0 md:pt-8 md:pb-11">
                    <div className="flex flex-row items-center pl-2 pb-4 md:pl-10 md:pb-4 drop-shadow-md">
                        <MicVocal strokeWidth={3} className="mr-2 h-7 w-7"/>
                        <span className="text-3xl font-bold pl-2">
                            Top artists
                        </span>
                    </div>
                    <ItemCarousel items={topArtists.slice(0, 22)} slideVariant="full"/>
                </div>
            </MobileBlock>
        </>
    );
}
