"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { useState } from "react";

export type ImageSizes = {
    base: string;
    sm: string;
    md: string;
};

export type ImageData = {
    src?: string;
    alt: string;
    width?: number;
    height?: number;
    sizes?: ImageSizes;
    quality?: number;
    loading?: "eager" | "lazy";
    fadeIn?: boolean;
};

export function SpotifyImage({
    imgData,
    className,
}: {
    imgData: ImageData;
} & React.HTMLProps<HTMLImageElement>) {
    const [isLoaded, setIsLoaded] = useState(false);
    const fadeIn = imgData.fadeIn ?? true;

    return (
        <Image
            src={imgData?.src || "/placeholder.png"}
            alt={imgData.alt}
            width={imgData.width || 640}
            height={imgData.height || 640}
            draggable={false}
            loading={imgData.loading || "lazy"}
            placeholder="empty"
            onLoad={(image) => {
                setIsLoaded(true);
                image.currentTarget.classList.remove("opacity-0");
            }}
            className={cn(
                "object-cover aspect-square self-center rounded-md transition-opacity",
                fadeIn && !isLoaded ? "opacity-0" : "opacity-100",
                className,
            )}
        />
    );
}
