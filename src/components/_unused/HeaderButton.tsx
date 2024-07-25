"use client"

import Link from "next/link";
import {Button, ButtonProps} from "@/components/ui/button";
import {usePathname} from 'next/navigation';
import {cn} from '@/lib/utils';

export default function HeaderButton({href, className, children}: ButtonProps & {
    href: string
}) {
    const pathname = usePathname();
    const isActive = pathname === href || pathname.startsWith(`${href}/`);

    return (
        <Button variant="inverse-mobile"
                draggable={false}
                onClick={() => navigator.vibrate([70, 10, 30])}
                className={cn(
                    className,
                    'text-sm md:text-lg transition-all w-full min-w-0 md:max-w-96 select-none',  // wtf why does min-w-0 work?
                    isActive && 'font-extrabold bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900'
                )}
                asChild
        >
            <Link href={href} className={cn(isActive && 'pointer-events-none')}>{children}</Link>
        </Button>
    );
}