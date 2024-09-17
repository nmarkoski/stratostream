"use client"

import SignOutDialog from "@/app/(main)/SignOutDialog";
import {useState} from "react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {CircleUser, House, ListMusic, LogOut, Settings} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import {DesktopBlock} from "@/components/devices";

function UserAvatar({imgSrc}: {
    imgSrc: string
}) {
    return (
        <Avatar draggable="false" className="select-none">
            <AvatarImage src={imgSrc} className="object-cover"/>
            <AvatarFallback asChild>
                <CircleUser strokeWidth={1.5}/>
            </AvatarFallback>
        </Avatar>
    );
}

function UserMenu({userName, onSignOutClick, children}: {
    userName: string
    onSignOutClick: React.Dispatch<React.SetStateAction<boolean>>
    children: React.ReactNode
}) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="outline-none">
                {children}
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="md:w-52"
                sideOffset={6}
                align="start"
            >
                <div className="block md:hidden">
                    <DropdownMenuLabel className="font-bold">Hello, {userName}</DropdownMenuLabel>
                    <DropdownMenuSeparator/>
                </div>
                <DropdownMenuItem asChild>
                    <Link href="/">
                        <House className="mr-2 h-4 w-4"/>
                        Home
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild disabled={true}>
                    <Link href="/my-playlists">
                        <ListMusic className="mr-2 h-4 w-4"/>
                        My Playlists
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href="/settings">
                        <Settings className="mr-2 h-4 w-4"/>
                        Settings
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator/>
                <DropdownMenuItem
                    className="text-red-600 dark:text-red-500 focus:text-red-700 dark:focus:text-red-400 focus:bg-red-600/10 dark:focus:bg-red-500/20"
                    onSelect={(e) => {
                        onSignOutClick(true)
                        navigator.vibrate([150, 100, 150])
                        e.preventDefault()
                        e.stopPropagation()
                    }}
                >
                    <LogOut className="mr-2 h-4 w-4"/>
                    Sign Out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default function User({userName, imgSrc}: {
    userName?: string
    imgSrc?: string
}) {

    const [open, setOpen] = useState(false);

    return (
        <div className="flex flex-row flex-grow justify-center md:justify-start items-center px-3 md:gap-4 drop-shadow-md">
            <UserMenu userName={userName ? userName : 'User'} onSignOutClick={setOpen}>
                <UserAvatar imgSrc={imgSrc ? imgSrc : ''}/>
            </UserMenu>
            <SignOutDialog open={open} onOpenChange={setOpen}/>
            <DesktopBlock className="w-max select-none">
                <span>Hello, {userName ? userName : 'User'}</span>
            </DesktopBlock>
        </div>
    );
}