import {
    Card,
    CardFooter,
    CardHeader,
} from "@/components/ui/card"
import {
    Alert,
    AlertDescription,
} from "@/components/ui/alert"
import SignInButtonForm from "@/app/(landing)/welcome/SignInButton";
import {signIn} from "@/utils/supabase/signIn";
import StratostreamLogo from "@/app/(landing)/welcome/StratostreamLogo";

export default function CardWithForm({searchParams}: { searchParams: { message: string } }) {

    return (
        <Card>
            <CardHeader className="p-8">
                <div className="dark:brightness-200 dark:contrast-125 w-96 h-36">
                    <StratostreamLogo/>
                </div>
            </CardHeader>
            <CardFooter className="flex justify-center items-center flex-col gap-4">
                {searchParams?.message &&
                    <Alert variant="destructive" className="bg-red-600/10 dark:text-red-500/90">
                        <AlertDescription>
                            {searchParams.message}
                        </AlertDescription>
                    </Alert>
                }
                <SignInButtonForm formAction={signIn}/>
            </CardFooter>
        </Card>
    )
}
