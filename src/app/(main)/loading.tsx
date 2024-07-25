
import {Disc, MicVocal, Music} from "lucide-react";
import {SkeletonCarousel} from "@/components/spotify/carousels";
import {Separator} from "@/components/ui/separator";
import {DesktopFlex, MobileBlock} from "@/components/devices";

export default function Loading() {
    return(
        <div className="h-full flex flex-col overflow-hidden">
            <div className="p-4 pb-6 md:p-0 md:content-center md:h-[51%]">
                <div className="flex flex-row items-center pl-2 pb-4 md:pl-10 md:pb-4 drop-shadow-md">
                    <Music strokeWidth={3} className="mr-2 h-7 w-7"/>
                    <span className="text-3xl font-bold pl-2">
                        Top tracks
                    </span>
                </div>
                <SkeletonCarousel length={8} variant={1} slideVariant="full"/>
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
                    <SkeletonCarousel length={4} variant={1} slideVariant="half"/>
                </div>
                <Separator orientation="vertical"/>
                <div className="w-[49.9%]">
                    <div className="flex flex-row items-center pl-10 pb-4 drop-shadow-md">
                        <MicVocal strokeWidth={3} className="mr-2 h-7 w-7"/>
                        <span className="text-3xl font-bold pl-2">
                            Top artists
                        </span>
                    </div>
                    <SkeletonCarousel length={4} variant={2} slideVariant="half"/>
                </div>
            </DesktopFlex>
            <MobileBlock>
                <div className="p-4 pb-6 md:p-0 md:pt-8 md:pb-11">
                    <div className="flex flex-row items-center pl-2 pb-4 md:pl-10 md:pb-4 drop-shadow-md">
                        <Disc strokeWidth={3} className="mr-2 h-7 w-7"/>
                        <span className="text-3xl font-bold pl-2">
                            Top albums
                        </span>
                    </div>
                    <SkeletonCarousel length={2} variant={1} slideVariant="full"/>
                </div>
                <Separator/>
                <div className="p-4 pb-6 md:p-0 md:pt-8 md:pb-11">
                    <div className="flex flex-row items-center pl-2 pb-4 md:pl-10 md:pb-4 drop-shadow-md">
                        <MicVocal strokeWidth={3} className="mr-2 h-7 w-7"/>
                        <span className="text-3xl font-bold pl-2">
                            Top artists
                        </span>
                    </div>
                    <SkeletonCarousel length={2} variant={2} slideVariant="full"/>
                </div>
            </MobileBlock>
        </div>
    );
}