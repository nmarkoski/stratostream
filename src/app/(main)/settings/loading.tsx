import { Bolt } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

export default function Loading() {
    return (
        <div className="w-full flex flex-col justify-center items-center p-6">
            <div className="w-full flex flex-row justify-center items-center pb-10 drop-shadow-md">
                <Bolt strokeWidth={3} className="mr-2 h-7 w-7" />
                <span className="text-3xl font-bold">Settings</span>
            </div>
            <div className="w-full md:w-[40%] flex flex-col gap-8">
                <div className="w-full flex flex-row justify-between items-center">
                    <div className="flex flex-col">
                        <Skeleton className="h-6 w-20 mb-1" />
                    </div>
                    <Skeleton className="h-10 w-36" />
                </div>
                <Separator />
                <div className="w-full flex flex-row justify-between items-center">
                    <div className="flex flex-col">
                        <Skeleton className="h-6 w-40 mb-1" />
                        <Skeleton className="h-4 w-60" />
                    </div>
                    <Skeleton className="h-10 w-36" />
                </div>
            </div>
        </div>
    );
}
