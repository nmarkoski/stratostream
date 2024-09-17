"use client"

import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuLabel,
    ContextMenuSeparator,
    ContextMenuSub,
    ContextMenuSubContent,
    ContextMenuSubTrigger,
    ContextMenuTrigger,
} from "@/components/ui/context-menu"
import {Album, Artist, SimplifiedAlbum, SimplifiedTrack, Track} from "@spotify/web-api-ts-sdk";
import {Disc, Eye, MicVocal, Play} from "lucide-react";
import {playSpotifyContent} from "@/utils/spotify/player";
import {usePathname, useRouter} from "next/navigation";
import {cn} from "@/lib/utils";

export function SimplifiedTrackMenu({children, className, track}: {
    children: React.ReactNode;
    track: SimplifiedTrack;
} & React.HTMLProps<HTMLDivElement>) {

    const router = useRouter();

    return (
        <ContextMenu modal={true}>
            <ContextMenuTrigger className={cn(className)}>
                {children}
            </ContextMenuTrigger>
            <ContextMenuContent className="min-w-40 max-w-72 shadow-lg">
                <ContextMenuLabel>
                    {track.name}
                </ContextMenuLabel>
                <ContextMenuSeparator/>
                <ContextMenuSub>
                    <ContextMenuSubTrigger>
                        <MicVocal className="mr-2 h-4 w-4"/>
                        <span>Artists</span>
                    </ContextMenuSubTrigger>
                    <ContextMenuSubContent>
                        {
                            track.artists.map(artist => {
                                return <ContextMenuItem
                                    key={artist.id}
                                    onClick={() => router.push(`/artists/${artist.id}`)}
                                >
                                    {artist.name}
                                </ContextMenuItem>
                            })
                        }
                    </ContextMenuSubContent>
                </ContextMenuSub>
            </ContextMenuContent>
        </ContextMenu>
    )
}

export function TrackMenu({children, className, track}: {
    children: React.ReactNode;
    track: Track;
} & React.HTMLProps<HTMLDivElement>) {

    const router = useRouter();
    const pathname = usePathname();

    return (
        <ContextMenu modal={true}>
            <ContextMenuTrigger className={cn(className)}>
                {children}
            </ContextMenuTrigger>
            <ContextMenuContent className="min-w-40 max-w-72 shadow-lg">
                <ContextMenuLabel
                    className="font-semibold"
                >
                    {track.name}
                </ContextMenuLabel>
                <ContextMenuSeparator/>
                <ContextMenuSub>
                    <ContextMenuSubTrigger>
                        <MicVocal className="mr-2 h-4 w-4"/>
                        <span>Artists</span>
                    </ContextMenuSubTrigger>
                    <ContextMenuSubContent>
                        {
                            track.artists.map(artist => {
                                const disabled = pathname === `/artists/${artist.id}`;
                                return <ContextMenuItem
                                        key={artist.id}
                                        onClick={() => router.push(`/artists/${artist.id}`)}
                                        disabled={disabled}
                                    >
                                        {artist.name}
                                    </ContextMenuItem>

                            })
                        }
                    </ContextMenuSubContent>
                </ContextMenuSub>
                <ContextMenuSub>
                    <ContextMenuSubTrigger>
                        <Disc className="mr-2 h-4 w-4"/>
                        <span>Album</span>
                    </ContextMenuSubTrigger>
                    <ContextMenuSubContent>
                        <ContextMenuLabel>
                            {track.album.name}
                        </ContextMenuLabel>
                        <ContextMenuSeparator/>
                        <ContextMenuItem onClick={() => playSpotifyContent({
                            contextUri: track.album.uri
                        })}>
                            <Play className="mr-2 h-4 w-4" />
                            <span>Play</span>
                        </ContextMenuItem>
                        <ContextMenuItem onClick={() => router.push(`/albums/${track.album.id}`)}>
                            <Eye className="mr-2 h-4 w-4"/>
                            <span>View</span>
                        </ContextMenuItem>
                    </ContextMenuSubContent>
                </ContextMenuSub>
            </ContextMenuContent>
        </ContextMenu>
    )
}

export function AlbumMenu({children, className, album}: {
    children: React.ReactNode;
    album: Album | SimplifiedAlbum;
} & React.HTMLProps<HTMLDivElement>) {

    const router = useRouter();
    const pathname = usePathname();

    return (
        <ContextMenu modal={true}>
            <ContextMenuTrigger className={cn(className)}>
                {children}
            </ContextMenuTrigger>
            <ContextMenuContent className="min-w-40 max-w-72 shadow-lg">
                <ContextMenuLabel>
                    {album.name}
                </ContextMenuLabel>
                <ContextMenuSeparator/>
                <ContextMenuSub>
                    <ContextMenuSubTrigger>
                        <MicVocal className="mr-2 h-4 w-4"/>
                        <span>Artists</span>
                    </ContextMenuSubTrigger>
                    <ContextMenuSubContent>
                        {
                            album.artists.map(artist => {
                                const disabled = pathname === `/artists/${artist.id}`;
                                return <ContextMenuItem
                                    key={artist.id}
                                    onClick={() => router.push(`/artists/${artist.id}`)}
                                    disabled={disabled}
                                >
                                    {artist.name}
                                </ContextMenuItem>
                            })
                        }
                    </ContextMenuSubContent>
                </ContextMenuSub>
                <ContextMenuSeparator/>
                <ContextMenuItem onClick={() => playSpotifyContent({
                    contextUri: album.uri
                })}>
                    <Play className="mr-2 h-4 w-4"/>
                    <span>Play</span>
                </ContextMenuItem>
            </ContextMenuContent>
        </ContextMenu>
    )
}

export function ArtistMenu({children, className, artist}: {
    children: React.ReactNode;
    artist: Artist;
} & React.HTMLProps<HTMLDivElement>) {

    return (
        <ContextMenu modal={true}>
            <ContextMenuTrigger className={cn(className)}>
                {children}
            </ContextMenuTrigger>
            <ContextMenuContent className="min-w-40 max-w-72 shadow-lg">
                <ContextMenuLabel>
                    {artist.name}
                </ContextMenuLabel>
                <ContextMenuSeparator/>
                <ContextMenuItem onClick={() => playSpotifyContent({
                    contextUri: artist.uri
                })}>
                    <Play className="mr-2 h-4 w-4"/>
                    <span>Play top tracks</span>
                </ContextMenuItem>
            </ContextMenuContent>
        </ContextMenu>
    )
}
