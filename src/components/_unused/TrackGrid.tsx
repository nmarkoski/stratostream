// import {Card} from "@/components/ui/card";
// import Image from "next/image";
// import {createClient} from "@/utils/supabase/server";
// import {Track} from "@spotify/web-api-ts-sdk";
//
// type trackData = {
//     trackName: string
//     trackImgSrc: string
//     trackArtists: string[]
// }
//
// function TrackCard({ trackData } : {
//     trackData: trackData
// }) {
//     return(
//         <Card className="flex flex-col justify-center select-none px-3 pt-3 pb-2 hover:shadow-blue-600/15 hover:ring-2 shadow-xl ring-blue-600/70 transition">
//             <Image
//                 src={trackData.trackImgSrc}
//                 alt={trackData.trackName}
//                 width={300}
//                 height={300}
//                 quality={85}
//                 priority={true}
//                 draggable={false}
//                 placeholder="empty"
//                 className="object-cover aspect-square self-center rounded-md bg-zinc-300 dark:bg-zinc-800 md:blur-[0.5px]"
//             />
//             <span
//                 className="font-semibold text-lg md:text-base truncate pt-2"
//             >{trackData.trackName}</span>
//             <span
//                 className="font-light text-sm md:text-xs truncate text-zinc-800 dark:text-zinc-300"
//             >{trackData.trackArtists.join(', ')}</span>
//         </Card>
//     );
// }
//
// export default async function Containers() {
//
//     const supabase = createClient();
//     const { data: { session } } = await supabase.auth.getSession()
//
//     if(!session) return null;
//
//     const response = await fetch('https://api.spotify.com/v1/search?q=Ozzy+Osbourne&type=track&market=US&limit=40', {
//         headers: {
//             'Authorization': `Bearer ${session?.provider_token}`
//         }
//     })
//
//     const data = await response.json()
//     const tracks = data.tracks.items.map((track:Track) => {
//         return {
//             trackName: track.name,
//             trackImgSrc: track.album.images?.[1].url,
//             trackArtists: track.artists.map(artist => artist.name),
//         }
//     })
//
//
//     return(
//         <div className="grid gap-3 grid-cols-[repeat(auto-fit,minmax(10rem,1fr))] grid-rows-1">
//             {tracks.map((trackData:trackData, index:number) => {
//                 return <TrackCard key={index} trackData={trackData} />;
//             })}
//         </div>
//     );
// }