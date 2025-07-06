"use client";

import { Card } from "@/components/ui/card";
import {
    Album,
    Artist,
    SimplifiedAlbum,
    SimplifiedTrack,
    Track,
} from "@spotify/web-api-ts-sdk";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import { ImageData, SpotifyImage } from "@/components/spotify/images";
import { playSpotifyContent } from "@/utils/spotify/player";
import { useToast } from "@/hooks/use-toast";
import {
    AlbumMenu,
    ArtistMenu,
    SimplifiedTrackMenu,
    TrackMenu,
} from "@/components/spotify/menus";

type ImgSizes = {
    base: string;
    sm: string;
    md: string;
};

// export function MarqueeText({ text, className }: {
//     text: string;
// } & React.HTMLProps<HTMLDivElement>) {
//     const textRef = useRef<HTMLDivElement>(null);
//     const [isOverflowing, setIsOverflowing] = useState(false);
//
//     useEffect(() => {
//         const checkOverflow = () => {
//             if (textRef.current) {
//                 console.log(
//                     `Scroll Width: ${textRef.current.offsetWidth}, Client Width: ${textRef.current.clientWidth}`
//                 );
//                 setIsOverflowing(textRef.current.scrollWidth > textRef.current.wid);
//             }
//         };
//
//         checkOverflow();
//
//         window.addEventListener('resize', checkOverflow);
//         return () => window.removeEventListener('resize', checkOverflow);
//     }, [text]);
//
//     return (
//         <div className={cn(className, 'overflow-hidden whitespace-nowrap box-content')} ref={textRef}>
//             <Marquee
//                 play={isOverflowing}
//                 className="inline-block"
//             >
//                 {text}
//             </Marquee>
//         </div>
//     );
// }

export function BaseCard({
    imgData,
    textData,
    onClick,
    className,
}: {
    imgData: ImageData;
    textData: {
        main: string;
        sub?: string;
    };
} & React.HTMLProps<HTMLDivElement>) {
    return (
        <Card // hover:shadow-blue-600/15 shadow-xl
            className={cn(
                "flex flex-col justify-center select-none px-3 pt-3 pb-2 hover:ring-2 ring-blue-600/70 transition cursor-pointer",
                className,
            )}
            onClick={onClick}
        >
            <SpotifyImage imgData={imgData} />
            <div className="flex flex-col justify-center pt-2.5 min-h-[2.65rem]">
                {textData?.sub ? (
                    <>
                        <span className="font-semibold text-base truncate leading-4">
                            {textData.main}
                        </span>
                        <span className="font-light text-xs text-zinc-800 dark:text-zinc-300 truncate">
                            {textData.sub}
                        </span>
                    </>
                ) : (
                    <>
                        <span className="font-bold text-base truncate">
                            {textData.main}
                        </span>
                    </>
                )}
            </div>
        </Card>
    );
}

export function SimplifiedTrackCard({
    track,
    index,
    context,
    offset,
    className,
}: {
    track: SimplifiedTrack;
    index: number;
    context?: string;
    offset?: number;
} & React.HTMLProps<HTMLDivElement>) {
    const { toast } = useToast();

    return (
        <SimplifiedTrackMenu track={track} className="w-full">
            <Card // hover:shadow-blue-600/15 shadow-xl
                className={cn(
                    "flex flex-col justify-center select-none px-3 pt-3 pb-2 hover:ring-2 ring-blue-600/70 transition cursor-pointer",
                    className,
                )}
                onClick={async () => {
                    const result = await playSpotifyContent({
                        ...(context &&
                            (offset || offset === 0) && {
                                contextUri: context,
                                offset: offset,
                            }),
                        ...((!context || (!offset && offset !== 0)) && {
                            trackUris: [track.uri],
                        }),
                    });
                    if (result?.message) {
                        toast({
                            title: result.message,
                            ...{ description: result?.description },
                            variant: "destructive",
                        });
                    }
                }}
            >
                <div className="w-full h-full aspect-square self-center rounded-md">
                    <div className="w-full h-full flex justify-center items-center">
                        <span className="text-6xl font-semibold">{index}</span>
                    </div>
                </div>
                <div className="flex flex-col justify-center pt-2.5 min-h-[2.65rem]">
                    <span className="font-semibold text-base truncate leading-4">
                        {track.name}
                    </span>
                    <span className="font-light text-xs text-zinc-800 dark:text-zinc-300 truncate">
                        {track.artists.map((artist) => artist.name).join(", ")}
                    </span>
                </div>
            </Card>
        </SimplifiedTrackMenu>
    );
}

export function TrackCard({
    track,
    context,
    offset,
    imgSizes,
    className,
}: {
    track: Track;
    context?: string;
    offset?: number;
    imgSizes?: ImgSizes;
} & React.HTMLProps<HTMLDivElement>) {
    const { toast } = useToast();

    return (
        <TrackMenu track={track} className="w-full">
            <BaseCard
                className={cn(className)}
                imgData={{
                    src: track?.album.images[0]?.url,
                    alt: track.name,
                    width: track?.album.images[0]?.width,
                    height: track?.album.images[0]?.height,
                    sizes: imgSizes ? imgSizes : undefined,
                    quality: 75,
                }}
                textData={{
                    main: track.name,
                    sub: track.artists.map((artist) => artist.name).join(", "),
                }}
                onClick={async () => {
                    const result = await playSpotifyContent({
                        ...(context &&
                            (offset || offset === 0) && {
                                contextUri: context,
                                offset: offset,
                            }),
                        ...((!context || (!offset && offset !== 0)) && {
                            trackUris: [track.uri],
                        }),
                    });
                    if (result?.message) {
                        toast({
                            title: result.message,
                            ...{ description: result?.description },
                            variant: "destructive",
                        });
                    }
                }}
            />
        </TrackMenu>
    );
}

export function AlbumCard({
    album,
    imgSizes,
    className,
}: {
    album: Album | SimplifiedAlbum;
    imgSizes?: ImgSizes;
} & React.HTMLProps<HTMLDivElement>) {
    const router = useRouter();

    return (
        <AlbumMenu album={album} className="w-full">
            <BaseCard
                className={cn(className)}
                imgData={{
                    src: album?.images[0]?.url,
                    alt: album.name,
                    width: album?.images[0]?.width,
                    height: album?.images[0]?.height,
                    sizes: imgSizes ? imgSizes : undefined,
                    quality: 75,
                }}
                textData={{
                    main: album.name,
                    sub: album.artists.map((artist) => artist.name).join(", "),
                }}
                onClick={() => {
                    router.push(`/albums/${album.id}`);
                }}
            />
        </AlbumMenu>
    );
}

export function ArtistCard({
    artist,
    imgSizes,
    className,
}: {
    artist: Artist;
    imgSizes?: ImgSizes;
} & React.HTMLProps<HTMLDivElement>) {
    const router = useRouter();

    return (
        <ArtistMenu artist={artist} className="w-full">
            <BaseCard
                className={cn(className)}
                imgData={{
                    src: artist.images[0]?.url,
                    alt: artist.name,
                    width: artist.images[0]?.width,
                    height: artist.images[0]?.height,
                    sizes: imgSizes ? imgSizes : undefined,
                    quality: 75,
                }}
                textData={{
                    main: artist.name,
                }}
                onClick={() => {
                    router.push(`/artists/${artist.id}`);
                }}
            />
        </ArtistMenu>
    );
}

export function SkeletonCard({
    variant,
    className,
}: {
    variant: 1 | 2;
} & React.HTMLProps<HTMLDivElement>) {
    // either keep it a skeleton or a div
    return (
        <Card
            className={cn(
                "flex flex-col justify-center px-3 pt-3 pb-2",
                className,
            )}
        >
            <Skeleton className="w-full h-full aspect-square self-center rounded-md" />
            <div className="flex flex-col justify-center pt-2.5 min-h-[2.65rem] gap-1.5">
                {variant === 1 ? (
                    <>
                        <Skeleton className="w-[100%] h-3.5" />
                        <Skeleton className="w-[75%] h-2.5" />
                    </>
                ) : (
                    <>
                        <Skeleton className="w-[80%] h-3.5" />
                    </>
                )}
            </div>
        </Card>
    );
}
