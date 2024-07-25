"use client"

import {SkeletonGrid} from "@/components/spotify/grids";
import {useSearchParams} from "next/navigation";

export default function Loading() {
    const searchParam = useSearchParams().get('s');

    if(!(searchParam?.trim())) {
        return null;
    }

    return (
        <div className="px-4 py-4 md:py-3.5 pr-[calc(1rem+7px)] overflow-hidden">
            <SkeletonGrid length={50} variant={1} />
        </div>
    );
}