import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import {
    Album,
    Artist,
    SimplifiedAlbum,
    SimplifiedTrack,
    Track,
} from "@spotify/web-api-ts-sdk";
import {
    AlbumCard,
    ArtistCard,
    SimplifiedTrackCard,
    SkeletonCard,
    TrackCard,
} from "@/components/spotify/cards";
import { DesktopFlex } from "@/components/devices";

function BaseCarousel({
    children,
    scrollBreakpoints,
    className,
}: {
    scrollBreakpoints: {
        base: number;
        sm: number;
        md: number;
    };
} & React.HTMLProps<HTMLDivElement>) {
    return (
        <Carousel
            className={cn("md:mx-[4rem]", className)}
            opts={{
                align: "start",
                dragFree: true,
                slidesToScroll: scrollBreakpoints?.base,
                breakpoints: {
                    "(min-width: 640px)": {
                        slidesToScroll: scrollBreakpoints.sm,
                    },
                    "(min-width: 768px)": {
                        slidesToScroll: scrollBreakpoints.md,
                    },
                },
            }}
        >
            <CarouselContent className={cn("p-[2px]")}>
                {children}
            </CarouselContent>
            <DesktopFlex>
                <CarouselPrevious
                    variant="ghost-mobile"
                    className="md:size-9 drop-shadow-md"
                />
                <CarouselNext
                    variant="ghost-mobile"
                    className="md:size-9 drop-shadow-md"
                />
            </DesktopFlex>
        </Carousel>
    );
}

// export function TrackCarousel({tracks, slideVariant, className}: {
//     tracks: Track[] | PlaylistedTrack<Track>[];
//     slideVariant?: 'full' | 'half'
// } & React.HTMLProps<HTMLDivElement>) {
//
//     const slideVariants = {
//         default: {
//             baseProps: {
//                 base: 1,
//                 sm: 3,
//                 md: 7
//             },
//             style: 'flex justify-center basis-[calc(100%/2)] sm:basis-[calc(100%/4)] md:basis-[calc(100%/8)]'
//         },
//         full: {
//             baseProps: {
//                 base: 1,
//                 sm: 3,
//                 md: 7
//             },
//             style: 'flex justify-center basis-[calc(100%/2)] sm:basis-[calc(100%/4)] md:basis-[calc(100%/8)]'
//         },
//         half: {
//             baseProps: {
//                 base: 1,
//                 sm: 1,
//                 md: 3
//             },
//             style: 'flex justify-center basis-[calc(100%/1)] sm:basis-[calc(100%/2)] md:basis-[calc(100%/4)]'
//         }
//     }
//
//     return(
//         <BaseCarousel className={cn(className)} scrollBreakpoints={slideVariant ? slideVariants[slideVariant].baseProps : slideVariants.default.baseProps}>
//             {tracks.map((track, index) => {
//                 if (typeof track.track === 'object') {
//                     return(
//                         <CarouselItem key={index} className={slideVariant ? slideVariants[slideVariant].style : slideVariants.default.style}>
//                             <TrackCard track={track.track} className="min-w-[6rem]"/>
//                         </CarouselItem>
//                     );
//                 } else if (track.track) {
//                     return(
//                         <CarouselItem key={index} className={slideVariant ? slideVariants[slideVariant].style : slideVariants.default.style}>
//                             <TrackCard track={track} className="min-w-[6rem]"/>
//                         </CarouselItem>
//                     );
//                 }
//             })}
//         </BaseCarousel>
//     );
// }

export function ItemCarousel({
    items,
    context,
    slideVariant,
    className,
}: {
    items: Track[] | SimplifiedTrack[] | Album[] | SimplifiedAlbum[] | Artist[];
    context?: string;
    slideVariant?: "full" | "half";
} & React.HTMLProps<HTMLDivElement>) {
    const calculateOffset = (
        trackList: Track[] | SimplifiedTrack[],
        track: Track | SimplifiedTrack,
    ) => {
        return trackList.findIndex((t) => t.id === track.id);
    };

    const slideVariants = {
        default: {
            baseProps: {
                base: 1,
                sm: 3,
                md: 7,
            },
            style: "flex justify-center basis-[calc(100%/2)] sm:basis-[calc(100%/4)] md:basis-[calc(100%/8)]",
        },
        full: {
            baseProps: {
                base: 1,
                sm: 3,
                md: 7,
            },
            style: "flex justify-center basis-[calc(100%/2)] sm:basis-[calc(100%/4)] md:basis-[calc(100%/8)]",
        },
        half: {
            baseProps: {
                base: 1,
                sm: 1,
                md: 3,
            },
            style: "flex justify-center basis-[calc(100%/2)] sm:basis-[calc(100%/2)] md:basis-[calc(100%/4)]",
        },
    };

    const imgSizes = {
        base: "20vw",
        sm: "50vw",
        md: "30vw",
    };

    return (
        <BaseCarousel
            className={cn(className)}
            scrollBreakpoints={
                slideVariant
                    ? slideVariants[slideVariant].baseProps
                    : slideVariants.default.baseProps
            }
        >
            {items.map((item, index) => {
                if (item.type === "track") {
                    if (Object.hasOwn(item, "album")) {
                        const track = item as Track;
                        const offset = context
                            ? calculateOffset(items as Track[], track)
                            : undefined;
                        return (
                            <CarouselItem
                                key={track.id}
                                className={
                                    slideVariant
                                        ? slideVariants[slideVariant].style
                                        : slideVariants.default.style
                                }
                            >
                                <TrackCard
                                    track={track}
                                    context={context}
                                    offset={offset}
                                    imgSizes={imgSizes}
                                    className="min-w-[5rem]"
                                />
                            </CarouselItem>
                        );
                    } else {
                        const track = item as SimplifiedTrack;
                        const offset = context
                            ? calculateOffset(items as SimplifiedTrack[], track)
                            : undefined;
                        return (
                            <CarouselItem
                                key={track.id}
                                className={
                                    slideVariant
                                        ? slideVariants[slideVariant].style
                                        : slideVariants.default.style
                                }
                            >
                                <SimplifiedTrackCard
                                    track={track}
                                    index={index + 1}
                                    context={context}
                                    offset={offset}
                                    className="min-w-[5rem]"
                                />
                            </CarouselItem>
                        );
                    }
                } else if (item.type === "album") {
                    const album = item as Album | SimplifiedAlbum;
                    return (
                        <CarouselItem
                            key={album.id}
                            className={
                                slideVariant
                                    ? slideVariants[slideVariant].style
                                    : slideVariants.default.style
                            }
                        >
                            <AlbumCard
                                album={album}
                                imgSizes={imgSizes}
                                className="min-w-[5rem]"
                            />
                        </CarouselItem>
                    );
                } else if (item.type === "artist") {
                    const artist = item as Artist;
                    return (
                        <CarouselItem
                            key={artist.id}
                            className={
                                slideVariant
                                    ? slideVariants[slideVariant].style
                                    : slideVariants.default.style
                            }
                        >
                            <ArtistCard
                                artist={artist}
                                imgSizes={imgSizes}
                                className="min-w-full h-auto"
                            />
                        </CarouselItem>
                    );
                }
            })}
        </BaseCarousel>
    );
}

export function SkeletonCarousel({
    length,
    variant,
    slideVariant,
    className,
}: {
    length: number;
    variant: 1 | 2;
    slideVariant?: "full" | "half";
} & React.HTMLProps<HTMLDivElement>) {
    const slideVariants = {
        default: {
            baseProps: {
                base: 1,
                sm: 3,
                md: 7,
            },
            style: "flex justify-center basis-[calc(100%/2)] sm:basis-[calc(100%/4)] md:basis-[calc(100%/8)]",
        },
        full: {
            baseProps: {
                base: 1,
                sm: 3,
                md: 7,
            },
            style: "flex justify-center basis-[calc(100%/2)] sm:basis-[calc(100%/4)] md:basis-[calc(100%/8)]",
        },
        half: {
            baseProps: {
                base: 1,
                sm: 1,
                md: 3,
            },
            style: "flex justify-center basis-[calc(100%/1)] sm:basis-[calc(100%/2)] md:basis-[calc(100%/4)]",
        },
    };

    return (
        <BaseCarousel
            className={cn("pointer-events-none", className)}
            scrollBreakpoints={
                slideVariant
                    ? slideVariants[slideVariant].baseProps
                    : slideVariants.default.baseProps
            }
        >
            {Array(length)
                .fill(null)
                .map((_, index) => (
                    <CarouselItem
                        key={index}
                        className={
                            slideVariant
                                ? slideVariants[slideVariant].style
                                : slideVariants.default.style
                        }
                    >
                        <SkeletonCard
                            variant={variant}
                            className="min-w-full h-auto"
                        />
                    </CarouselItem>
                ))}
        </BaseCarousel>
    );
}
