import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction
} from '@/components/ui/alert-dialog'
import {Button, ButtonProps} from "@/components/ui/button";
import {useFormStatus} from "react-dom";
import {LoaderCircle} from "lucide-react";
import {signOut} from "@/utils/supabase/signOut"

function SignOutButton({formAction}: ButtonProps) {
    const {pending, action} = useFormStatus();
    const isPending = pending && action === formAction;

    return (
        <Button
            className="bg-red-500 hover:bg-red-600 dark:bg-red-600/65 hover:dark:bg-red-500/65 dark:text-current w-full md:w-[5.58rem]"
            type="submit"
            formAction={formAction}
            disabled={isPending}
        >
            {isPending ? <LoaderCircle className="h-4 w-4 animate-spin"/> : 'Sign Out'}
        </Button>
    );
}

function SignOutForm({formAction}: ButtonProps) {
    return (
        <form className="w-full md:w-fit">
            <SignOutButton formAction={formAction}/>
        </form>
    );
}

export default function SignOutDialog({open, onOpenChange}: ButtonProps & {
    open: boolean
    onOpenChange: React.Dispatch<React.SetStateAction<boolean>>
}) {
    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent
                onCloseAutoFocus={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                }}
            >
                <AlertDialogHeader>
                    <AlertDialogTitle>Sign Out</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to sign out?
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction asChild onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                    }}>
                        <SignOutForm formAction={signOut}/>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}