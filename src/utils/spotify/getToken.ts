"use server"

import { createClient } from "@/utils/supabase/server";

export default async function getToken() {
    const supabase = createClient();
    const { data: { session } } = await supabase.auth.getSession();
    return session?.provider_token;
}