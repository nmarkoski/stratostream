import { createClient } from "@/utils/supabase/server";
import { SpotifyApi } from "@spotify/web-api-ts-sdk";
import { ItemGrid } from "@/components/spotify/grids";

export default async function Artists({
    searchParams,
}: {
    searchParams: { [s: string]: string | undefined };
}) {
    if (!searchParams["s"]?.trim()) {
        return null;
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

    const result = await spotify.search(
        searchParams["s"],
        ["artist"],
        undefined,
        50,
    );

    return (
        <div className="p-3 md:px-4 md:py-3.5">
            {result.artists.total > 0 ? (
                <>
                    <ItemGrid items={result.artists.items} />
                    {/*<ItemGrid items={result.albums.items.filter(album => album.album_type !== 'single')}/>*/}
                </>
            ) : (
                <>
                    <span className="text-3xl font-bold">
                        No results for &quot;{searchParams["s"].trim()}&quot;
                    </span>
                </>
            )}
        </div>
    );
}
