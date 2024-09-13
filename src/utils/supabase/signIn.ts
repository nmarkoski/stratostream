"use server"

import {createClient} from "@/utils/supabase/server";
import {redirect} from "next/navigation";

export const signIn = async () => {
    const supabase = createClient();

    const baseUrl =  `${(process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_VERCEL_URL || 'http://localhost:3000').replace(/^(?!https?:\/\/)/, 'https://').replace(/\/?$/, '/')}/`;

    const {data, error} = await supabase.auth.signInWithOAuth({
        provider: 'spotify',
        options: {
            scopes: 'user-read-private user-read-email user-read-playback-state user-modify-playback-state user-read-currently-playing app-remote-control streaming playlist-read-private playlist-read-collaborative playlist-modify-private playlist-modify-public user-follow-modify user-follow-read user-read-playback-position user-top-read user-read-recently-played user-library-modify user-library-read',
            redirectTo: `${baseUrl}/auth/callback`,
        }
    });

    if (error) {
        console.error('Could not authenticate user:', error);
        return redirect(`/welcome?message=${encodeURIComponent('Could not authenticate user.')}`);
    }

    return redirect(data.url);
};