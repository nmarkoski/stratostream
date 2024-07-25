"use client"

import {Disc, MicVocal, Music} from "lucide-react";
import {Button, ButtonProps} from "@/components/ui/button";
import {usePathname, useSearchParams} from "next/navigation";
import {cn} from "@/lib/utils";
import Link from "next/link";
import {DesktopBlock} from "@/components/devices";

function HeaderButton({href, className, children}: ButtonProps & {
    href: string
}) {
    const pathname = usePathname();
    const isActive = pathname.startsWith(`${href}`);
    const isRoot = pathname === href;
    const searchParam = useSearchParams().get('s')

    return (
        <Button variant="inverse-mobile"
                draggable={false}
                onClick={() => navigator.vibrate([70, 5, 30])}
                className={cn(
                    className,
                    'text-sm md:text-lg transition-all w-full min-w-0 md:max-w-96 select-none border-b-2 border-zinc-50/0 ring-blue-700 dark:ring-blue-600 md:hover:ring-2 drop-shadow-md',  // wtf why does min-w-0 work?
                    isActive && 'font-extrabold bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900 ring-2'
                )}
                asChild
        >
            <Link href={searchParam ? `${href}?s=${encodeURIComponent(searchParam)}` : href} className={cn(isRoot ? 'pointer-events-none' : '')}>{children}</Link>
        </Button>
    );
}

export default function HeaderNavBar() {
    return (
        <div
            className="flex flex-row items-center justify-center md:justify-end px-3 gap-3 md:gap-6 md:tracking-wide w-full">
            <HeaderButton href='/tracks'>
                <DesktopBlock>
                    <Music strokeWidth={3} className="mr-2 h-4 w-4"/>
                </DesktopBlock>
                <span>Tracks</span>
            </HeaderButton>
            <HeaderButton href='/albums'>
                <DesktopBlock>
                    <Disc strokeWidth={3} className="mr-2 h-4 w-4"/>
                </DesktopBlock>
                <span>Albums</span>
            </HeaderButton>
            <HeaderButton href='/artists'>
                <DesktopBlock>
                    <MicVocal strokeWidth={3} className="mr-2 h-4 w-4"/>
                </DesktopBlock>
                <span>Artists</span>
            </HeaderButton>
        </div>
    );
}