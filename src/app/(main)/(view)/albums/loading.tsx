import {Separator} from "@/components/ui/separator";
import {SkeletonCarousel} from "@/components/spotify/carousels";
import {Skeleton} from "@/components/ui/skeleton";

export default function Loading() {
    return(
        <>
            <Skeleton className="flex-1 flex">
                <Skeleton className="flex-1 flex flex-row justify-center items-center p-8 gap-10 md:gap-14 bg-black/25">
                    <Skeleton className="rounded-lg min-w-56 min-h-56 md:min-w-64 md:min-h-64 shadow-[0_3px_9px_-2px_rgba(0,0,0,0.7)]"/>
                    <div className="flex-1 max-w-64 flex flex-col gap-1">
                        <Skeleton className="w-full h-9 drop-shadow-[0_2.5px_1.5px_rgba(0,0,0,0.8)]" />
                        <Skeleton className="w-[80%] h-7 mb-3 md:mb-6 drop-shadow-[0_2px_1.5px_rgba(0,0,0,0.8)]" />
                        <Skeleton className="w-[30%] h-5 drop-shadow-[0_2px_1.5px_rgba(0,0,0,0.8)]" />
                        <Skeleton className="w-[35%] h-5 drop-shadow-[0_2px_1.5px_rgba(0,0,0,0.8)]" />
                        <Skeleton className="w-[45%] h-5 drop-shadow-[0_2px_1.5px_rgba(0,0,0,0.8)]" />
                    </div>
                </Skeleton>
            </Skeleton>
            <Separator/>
            <div className="h-80 content-center p-4">
                <SkeletonCarousel length={8} variant={1} slideVariant="full"/>
            </div>
        </>
    );
}