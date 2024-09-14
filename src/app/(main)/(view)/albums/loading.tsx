import {Separator} from "@/components/ui/separator";
import {SkeletonCarousel} from "@/components/spotify/carousels";
import {Skeleton} from "@/components/ui/skeleton";

export default function Loading() {
    return(
        <>
            <Skeleton className="flex-1 flex">
                <Skeleton className="flex-1 flex flex-row justify-center items-center p-8 gap-10 md:gap-14 bg-black/25">
                    <Skeleton className="flex-1 md:flex-none rounded-lg min-w-32 min-h-32 md:w-64 md:h-64 shadow-[0_3px_9px_-2px_rgba(0,0,0,0.7)]"/>
                    <div className="flex-1 max-w-64 flex flex-col gap-1">
                        <Skeleton className="w-full h-7 drop-shadow-[0_2.5px_1.5px_rgba(0,0,0,0.8)]" />
                        <Skeleton className="w-[80%] h-6 mb-3 md:mb-6 drop-shadow-[0_2px_1.5px_rgba(0,0,0,0.8)]" />
                        <Skeleton className="w-[42%] h-5 drop-shadow-[0_2px_1.5px_rgba(0,0,0,0.8)]" />
                        <Skeleton className="w-[49%] h-5 drop-shadow-[0_2px_1.5px_rgba(0,0,0,0.8)]" />
                        <Skeleton className="w-[63%] h-5 drop-shadow-[0_2px_1.5px_rgba(0,0,0,0.8)]" />
                    </div>
                </Skeleton>
            </Skeleton>
            <Separator/>
            <div className="h-60 md:h-80 content-center p-3 md:p-4">
                <SkeletonCarousel length={8} variant={1} slideVariant="full"/>
            </div>
        </>
    );
}