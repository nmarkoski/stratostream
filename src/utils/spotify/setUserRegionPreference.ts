"use server"

import {createClient} from "@/utils/supabase/server";
import {revalidateTag} from "next/cache";

export default async function setUserRegionPreference(region: string) {
    const supabase = createClient()

    const {data: {user},} = await supabase.auth.getUser();
    if(!user) throw new Error("No user found");

    const {error} = await supabase.auth.updateUser({
        data: { region_preference: region === 'global' ? null : region }
    });
    revalidateTag('region');

    if (error) throw new Error('Could not update user region preference');
}