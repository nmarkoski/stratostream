"use client"

import setUserRegionPreference from "@/utils/spotify/setUserRegionPreference";
import {regionList} from "@/utils/spotify/regionList";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {User} from "@supabase/auth-js";

export default function RegionSelect({user} : {user: User | null}) {
    return(
        <Select onValueChange={(value) => setUserRegionPreference(value)}
        >
            <SelectTrigger className="min-w-36 w-fit">
                <SelectValue placeholder={regionList[user?.user_metadata?.region_preference]?.name || regionList['global'].name }/>
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {
                        Object.entries(regionList).map(([key, value]) => (
                            <SelectItem key={key} value={key}>{value.name}</SelectItem>
                        ))
                    }
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}