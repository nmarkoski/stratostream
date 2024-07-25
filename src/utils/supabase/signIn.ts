"use server"

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export const signIn = async () => {
    const supabase = createClient();

    const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';

    const headersList = headers();
    const host = headersList.get('x-forwarded-host') || headersList.get('host') || "localhost:3000";

    const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

    const baseUrl = `${protocol}://${host}${basePath}`;

    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'spotify',
        options: {
            scopes: 'user-read-private user-read-email user-read-playback-state user-modify-playback-state user-read-currently-playing app-remote-control streaming playlist-read-private playlist-read-collaborative playlist-modify-private playlist-modify-public user-follow-modify user-follow-read user-read-playback-position user-top-read user-read-recently-played user-library-modify user-library-read',
            redirectTo: `${baseUrl}/auth/callback`
        }
    });

    if (error) {
        console.error('Could not authenticate user:', error);
        return redirect(`/welcome?message=${encodeURIComponent('Could not authenticate user.')}`);
    }

    return redirect(data.url);
};