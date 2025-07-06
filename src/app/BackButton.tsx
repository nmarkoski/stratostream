"use client";

import { useRouter } from "next/navigation";
import { Button, ButtonProps } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";

export default function BackButton({ className }: ButtonProps) {
    const router = useRouter();
    return (
        <Button
            onClick={() => router.back()}
            size="lg"
            className={cn(
                className,
                "md:h-12 md:rounded-md md:px-10 md:text-xl md:font-semibold bg-zinc-300 hover:bg-zinc-400/60",
            )}
            variant="secondary"
        >
            <ChevronLeft
                strokeWidth="0.15rem"
                className="mr-2 h-4 md:h-6 w-4 md:w-6"
            />
            <span>Go Back</span>
        </Button>
    );
}
