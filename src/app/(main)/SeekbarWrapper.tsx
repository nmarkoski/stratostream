import {createClient} from "@/utils/supabase/server";
import Seekbar from "@/app/(main)/Seekbar";

export default async function SeekbarWrapper() {
    const supabase = createClient();
    const {data: {session}} = await supabase.auth.getSession();

    return(
            <Seekbar spotifyToken={session?.provider_token}/>
    );
}