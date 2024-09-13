"use client"

import {SkeletonGrid} from "@/components/spotify/grids";
import {useSearchParams} from "next/navigation";

export default function Loading() {
    const searchParam = useSearchParams().get('s');

    if(!(searchParam?.trim())) {
        return null;
    }

    return (
        <div className="p-3 md:px-4 md:py-3.5 pr-[calc(0.75rem+4px)] md:pr-[calc(1rem+7px)] overflow-hidden">
            <SkeletonGrid length={50} variant={2}/>
        </div>
    );
}