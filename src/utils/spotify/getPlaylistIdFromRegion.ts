"use server"

import {regionList} from "@/utils/spotify/regionList";

export default async function getPlaylistIdFromRegion(region?: string) {
    if(!region || !(region in regionList)) return regionList['global'].playlistId;
    return regionList[region].playlistId;
}