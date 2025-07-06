import { Bolt } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import ThemeSelect from "@/app/(main)/settings/ThemeSelect";
import { createClient } from "@/utils/supabase/server";
import RegionSelect from "@/app/(main)/settings/RegionSelect";

export default async function Settings() {
    const supabase = createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    return (
        <div className="w-full flex flex-col justify-center items-center p-6">
            <div className="w-full flex flex-row justify-center items-center pb-10 drop-shadow-md">
                <Bolt strokeWidth={3} className="mr-2 h-7 w-7" />
                <span className="text-3xl font-bold">Settings</span>
            </div>
            <div className="w-full md:w-[40%] flex flex-col gap-8">
                <div className="w-full flex flex-row justify-between items-center gap-4">
                    <div className="flex flex-col">
                        <span className="text-lg font-semibold">Theme</span>
                    </div>
                    <ThemeSelect />
                </div>
                <Separator />
                <div className="w-full flex flex-row justify-between items-center gap-4">
                    <div className="flex flex-col">
                        <span className="text-lg font-semibold">
                            Region preference
                        </span>
                        <span className="text-sm font-light text-zinc-800 dark:text-zinc-300">
                            Only affects the selection on the front page
                        </span>
                    </div>
                    <RegionSelect user={user} />
                </div>
            </div>
        </div>
    );
}
