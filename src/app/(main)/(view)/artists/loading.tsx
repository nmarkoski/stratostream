import {Separator} from "@/components/ui/separator";
import {DesktopFlex, MobileBlock} from "@/components/devices";
import {SkeletonCarousel} from "@/components/spotify/carousels";
import {Skeleton} from "@/components/ui/skeleton";

export default function Loading() {
    return(
        <>
            <Skeleton className="flex-1 flex">
                <Skeleton className="flex-1 flex flex-row justify-center items-center p-8 gap-10 md:gap-14 bg-black/25">
                    <Skeleton className="flex-1 md:flex-none rounded-full min-w-32 min-h-32 md:w-64 md:h-64 shadow-[0_3px_9px_-2px_rgba(0,0,0,0.7)]" />
                    <div className="flex-1 max-w-64 flex flex-col gap-1">
                        <Skeleton className="w-[85%] h-7 drop-shadow-[0_2.5px_1.5px_rgba(0,0,0,0.8)]" />
                        <Skeleton className="w-full h-6 mb-3 md:mb-6 drop-shadow-[0_2px_1.5px_rgba(0,0,0,0.8)]" />
                        <Skeleton className="w-[69%] h-5 drop-shadow-[0_2px_1.5px_rgba(0,0,0,0.8)]" />
                    </div>
                </Skeleton>
            </Skeleton>
            <Separator/>
            <DesktopFlex className="h-80 flex flex-row justify-center items-center">
                <div className="w-[49.9%] py-4">
                    <Skeleton className="w-[45%] h-9 ml-12 mb-4 drop-shadow-md" />
                    <SkeletonCarousel length={4} variant={1}  slideVariant="half"/>
                </div>
                <Separator orientation="vertical"/>
                <div className="w-[49.9%] py-4">
                    <Skeleton className="w-[45%] h-9 ml-12 mb-4 drop-shadow-md" />
                    <SkeletonCarousel length={4} variant={1} slideVariant="half"/>
                </div>
            </DesktopFlex>
            <MobileBlock>
                <div className="p-3">
                    <Skeleton className="w-[77%] h-8 mb-3 drop-shadow-md" />
                    <SkeletonCarousel length={4} variant={1}  slideVariant="full"/>
                </div>
                <Separator/>
                <div className="p-3 pb-6">
                    <Skeleton className="w-[77%] h-8 mb-3 drop-shadow-md" />
                    <SkeletonCarousel length={4} variant={1}  slideVariant="full"/>
                </div>
            </MobileBlock>
        </>
    );
}