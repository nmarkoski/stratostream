import { Separator } from "@/components/ui/separator";
import HeaderNavBar from "@/app/(main)/HeaderNavBar";
import User from "@/app/(main)/User";
import { createClient } from "@/utils/supabase/server";
import { MobileBlock } from "@/components/devices";

export default async function Header() {
    const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    return (
        <header className="flex flex-row md:px-12 min-h-16 dark:bg-zinc-800/10 shadow-md z-20">
            <User
                userName={user?.user_metadata["name"]}
                imgSrc={user?.user_metadata["avatar_url"]}
            />
            <MobileBlock>
                <Separator orientation="vertical" />
            </MobileBlock>
            <HeaderNavBar />
        </header>
    );
}
