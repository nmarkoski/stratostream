"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState, useRef } from "react";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function SearchBar() {
    const [searchString, setSearchString] = useState("");
    const [isOpened, setIsOpened] = useState(false);
    const isTyping = useRef(false);
    const path = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();

    // Effect to sync URL with search bar on navigation
    useEffect(() => {
        const currentSearchParam = searchParams.get("s");
        if (currentSearchParam && !isTyping.current) {
            setSearchString(currentSearchParam);
        }
    }, [searchParams]);

    // Effect to update URL when search string changes
    useEffect(() => {
        const timeout = setTimeout(() => {
            isTyping.current = false;
            if (searchString.trim()) {
                router.push(
                    `${path}?s=${encodeURIComponent(searchString.trim())}`,
                    { scroll: false },
                );
            } else {
                router.push(path, { scroll: false });
            }
        }, 250);
        return () => clearTimeout(timeout);
    }, [searchString, path, router]);

    // Effect to open the search bar with a slight delay
    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsOpened(true);
        }, 1);
        return () => clearTimeout(timeout);
    }, []);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        isTyping.current = true;
        setSearchString(e.target.value);
    };

    return (
        <div className="pb-14 md:pb-16">
            <div className={cn("absolute w-full pb-4 overflow-hidden z-30")}>
                <div
                    className={cn(
                        "transition-transform",
                        isOpened ? "" : "-translate-y-14 md:-translate-y-16",
                    )}
                >
                    <div
                        className={cn(
                            `flex justify-center items-center px-3 md:px-4 py-2 md:py-3 bg-zinc-100/20 dark:bg-zinc-800/20 backdrop-blur-sm shadow-md drop-shadow-sm`,
                        )}
                    >
                        <Input
                            type="text"
                            placeholder={`Search for ${path.slice(1)}...`}
                            value={searchString}
                            autoFocus={true}
                            spellCheck={false}
                            onChange={handleSearch}
                            className="text-base md:text-lg font-semibold rounded-full pl-4 bg-white/95 dark:bg-black/90"
                        />
                    </div>
                    <Separator />
                </div>
            </div>
        </div>
    );
}
