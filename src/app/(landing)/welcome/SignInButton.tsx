"use client"

import {Button, ButtonProps} from "@/components/ui/button"
import {FaSpotify} from "react-icons/fa6";
import {useFormStatus} from "react-dom";
import {LoaderCircle} from "lucide-react";
import {cn} from "@/lib/utils";

function SignInButton({formAction, className}: ButtonProps) {

    const {pending, action} = useFormStatus();
    const isPending = pending && action === formAction;

    return (
        <Button
            className={cn(className, 'w-full bg-green-500 hover:bg-green-600 dark:bg-green-700 hover:dark:bg-green-600/90 text-zinc-50 dark:text-zinc-50')}
            formAction={formAction}
            type="submit"
            disabled={isPending}
        >
            {isPending ? <LoaderCircle className="mr-2 mb-0.5 h-4 w-4 animate-spin"/> :
                <FaSpotify className="mr-2 mb-0.5 h-4 w-4"/>}
            Sign In with Spotify
        </Button>
    );
}

export default function SignInButtonForm({formAction}: ButtonProps) {
    return (
        <form className="w-full">
            <SignInButton formAction={formAction}/>
        </form>
    );
}