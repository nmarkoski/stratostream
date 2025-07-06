"use server";

import { createClient } from "@/utils/supabase/server";

export default async function setUserDeviceID(deviceID: string) {
    const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error("No user found");

    const { error } = await supabase.auth.updateUser({
        data: { spotify_device_id: deviceID },
    });

    if (error) throw new Error("Could not update user device ID");
}
