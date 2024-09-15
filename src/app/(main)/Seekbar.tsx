"use client"

import {
    WebPlaybackSDK,
    useWebPlaybackSDKReady,
    useSpotifyPlayer,
    usePlaybackState,
    usePlayerDevice,
    PlayerDevice
} from "react-spotify-web-playback-sdk";
import {Pause, Play, Repeat, Shuffle, SkipBack, SkipForward} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Slider} from "@/components/ui/slider";
import {msToDurationSeek} from "@/utils/msToDuration";
import {cn} from "@/lib/utils";
import {SpotifyImage} from "@/components/spotify/images";
import Link from "next/link";
import {useEffect, useState} from "react";
import setUserDeviceID from "@/utils/spotify/setUserDeviceID";
import {HoverCard, HoverCardTrigger, HoverCardContent} from "@/components/ui/hover-card";
import {DesktopFlex, MobileFlex} from "@/components/devices";
import {toast, useToast} from "@/hooks/use-toast";

export default function Seekbar({spotifyToken} : {spotifyToken: string | null | undefined}) {

    if(!spotifyToken) return null;

    return(
            <WebPlaybackSDK
                initialDeviceName="Stratostream Player"
                getOAuthToken={(cb) => {
                    cb(spotifyToken)
                }}
                initialVolume={1}
                connectOnInitialized={true}
            >
                <SeekbarLayout/>
            </WebPlaybackSDK>
    );
}

function SeekbarLayout() {
    const [isActiveMobile, setIsActiveMobile] = useState(false);
    const [isClickedMobile, setIsClickedMobile] = useState(false);

    const player = useSpotifyPlayer();
    const device = usePlayerDevice();
    const state = usePlaybackState(true, 1000);
    const currentTrack = state?.track_window.current_track;

    const isReady = !!(useWebPlaybackSDKReady() && device);
    const isActive = !!(isReady && currentTrack);

    useEffect(() => {
        player?.addListener('ready', ({device_id}) => {
            setUserDeviceID(device_id);
        })
        return () => {
            player?.removeListener('ready');
        }
    })

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsActiveMobile(isActive);
        }, 150);

        return () => clearTimeout(timer);
    }, [isActive]);

    // const currentTrack = useCurrentTrack();
    // const player = useSpotifyPlayer();
    // const state = useSpotifyState();
    //
    // useEffect(() => {
    //     player?.addListener('ready', () => {
    //         // player.addListener('player_state_changed', ({position, duration}: PlayerState) => {
    //         //     setPlayerState({
    //         //         position,
    //         //         duration
    //         //     })
    //         // });
    //         player.activateElement();
    //         setIsReady(true);
    //     })
    //     player?.addListener('not_ready', () => {
    //         setIsReady(false);
    //     })
    //
    //     return () => {
    //         player?.removeListener('ready');
    //         player?.removeListener('not_ready');
    //     }
    // })

    return (
        <>
            <DesktopFlex className="flex-row justify-center items-center min-h-24 dark:bg-zinc-800/10 shadow-t-md z-20">
                {
                    isActive ?
                        <SeekbarInfo currentTrack={currentTrack} className="flex-grow-0 w-[25%] pl-4 md:pl-6"/>
                        :
                        null
                }
                <SeekbarControls
                    player={player}
                    state={state}
                    device={device}
                    isActive={isActive}
                    className="max-w-[50%] h-full flex-1"
                />
                {
                    isActive ?
                        <div className="flex-grow-0 flex items-center justify-end text-center w-[25%] pr-2 md:pr-6">
                            <SeekbarImage currentTrack={currentTrack} className="w-20 rounded-md select-none"/>
                        </div>
                        :
                        null
                }
            </DesktopFlex>
            <MobileFlex className={cn('h-0 transition-height overflow-hidden bg-zinc-800/10', isClickedMobile ? 'h-16' : '')}>
                {
                    isActive ?
                        <SeekbarInfo currentTrack={currentTrack} className="w-full pl-4 pt-2 h-16"/>
                        :
                        null
                }
            </MobileFlex>
            <MobileFlex className="flex-row justify-center items-center min-h-24 px-4 dark:bg-zinc-800/10 z-20">
                <SeekbarControls
                    player={player}
                    state={state}
                    device={device}
                    isActive={isActive}
                    className="h-full flex-1 transition-width"
                />
                <div
                    className={cn('flex-grow-0 flex items-center justify-center transition-all', isActiveMobile ? 'ml-3' : '')}
                    onClick={() => setIsClickedMobile(!isClickedMobile)}
                >
                    {
                        isActive ?
                            <SeekbarImage currentTrack={currentTrack} className={cn('w-0 rounded-md select-none transition-width', isActiveMobile ? 'w-[4.8rem]' : '')}/>
                            :
                            null
                    }
                </div>
            </MobileFlex>
        </>
    );
}

function SeekbarInfo({currentTrack, className}: {
    currentTrack: Spotify.Track,
} & React.HTMLProps<HTMLDivElement>) {
    return (
        <div className={cn(className, 'flex flex-col md:gap-1')}>
            <span className="text-lg md:text-xl font-semibold text-nowrap truncate">
                <Link href={`/albums/${currentTrack.album.uri.slice(14)}`}>
                    <span className="hover:underline">{currentTrack.name}</span>
                </Link>
            </span>
            <span className="text-sm font-light dark:text-zinc-300">{currentTrack.artists.map((artist, index) => {
                return (
                    <div key={artist.uri} className="inline-block">
                        <Link href={`/artists/${artist.uri.slice(15)}`}>
                            <span className="hover:underline">{artist.name}</span>
                        </Link>
                        <span className="whitespace-pre">{index < currentTrack.artists.length - 1 ? ', ' : ''}</span>
                    </div>
                );
            })}</span>
        </div>
    );
}

function SeekbarImage({currentTrack, className}: {
    currentTrack: Spotify.Track,
} & React.HTMLProps<HTMLDivElement>) {
    const [isDimmed, setIsDimmed] = useState(false);

    return (
        <HoverCard
            openDelay={500}
            onOpenChange={(open) => setIsDimmed(open)}
        >
            <HoverCardTrigger>
                <SpotifyImage
                    imgData={{
                        src: currentTrack.album.images[0].url,
                        alt: currentTrack.name,
                        width: currentTrack.album.images[0].width ?? undefined,
                        height: currentTrack.album.images[0].height ?? undefined,
                        loading: 'eager'
                    }}
                    className={cn(className, isDimmed ? 'opacity-50' : 'opacity-100')}
                />
            </HoverCardTrigger>
            <HoverCardContent
                side="top"
                sideOffset={26}
                collisionPadding={13}
                sticky="partial"
                className="w-52 md:w-72 shadow-lg"
            >
                <SpotifyImage
                    imgData={{
                        src: currentTrack.album.images[0].url,
                        alt: currentTrack.name,
                        width: currentTrack.album.images[0].width ?? undefined,
                        height: currentTrack.album.images[0].height ?? undefined,
                        loading: 'eager',
                        fadeIn: false
                    }}
                />
            </HoverCardContent>
        </HoverCard>
    );
}

function SeekbarControls({player, state, device, isActive, className}: {
    player: Spotify.Player | null,
    state: Spotify.PlaybackState | null,
    device: PlayerDevice | null,
    isActive: boolean
} & React.HTMLProps<HTMLDivElement>) {

    return (
        <div className={cn(className, 'flex flex-col justify-evenly items-center')}>
            <div className="w-full flex flex-row justify-between md:justify-center items-center md:gap-5 drop-shadow-md">
                <Button
                    size="icon"
                    variant="ghost-mobile"
                    className="rounded-full size-10 p-[0.65rem] transition"
                    onClick={() => console.log('Shuffle')}
                    disabled={!isActive || state?.disallows.toggling_repeat_context}
                >
                    <Shuffle
                        className="size-full"
                        strokeWidth={2.2}
                    />
                </Button>
                <Button
                    size="icon"
                    variant="ghost-mobile"
                    className="rounded-full size-10 p-[0.6rem] transition"
                    onClick={() => player?.previousTrack()}
                    // No state checks because it still serves as skipping to the start of the current track
                    disabled={!isActive}
                >
                    <SkipBack
                        className="size-full"
                        strokeWidth={2.2}
                    />
                </Button>
                <Button
                    size="icon"
                    variant="inverse-mobile"
                    className={cn('rounded-full size-11 p-[0.6rem] bg-zinc-900 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-900 border border-zinc-200/25 ring-blue-700 dark:ring-blue-600 md:hover:ring-2 transition', !isActive || state?.paused ? '' : 'ring-2')}
                    onClick={() => player?.togglePlay()}
                    disabled={!isActive}
                >
                    {
                        !isActive ?
                            <Play
                                strokeWidth={2.5}
                            />
                            :
                            <>
                                <Play
                                    className={cn('absolute transition-opacity', !state || !('paused' in state) || state?.paused ? '' : 'opacity-0')}
                                    strokeWidth={2.5}
                                />
                                <Pause
                                    className={cn('absolute transition-opacity', state && ('paused' in state) && state?.paused ? 'opacity-0' : '')}
                                    strokeWidth={2.5}
                                />
                            </>
                    }
                </Button>
                <Button
                    size="icon"
                    variant="ghost-mobile"
                    className="rounded-full size-10 p-[0.6rem] transition"
                    onClick={() => player?.nextTrack()}
                    disabled={!isActive || !state?.track_window.next_tracks.length || state?.disallows.skipping_next}
                >
                    <SkipForward
                        className="size-full"
                        strokeWidth={2.2}
                    />
                </Button>
                <Button
                    size="icon"
                    variant="ghost-mobile"
                    className="rounded-full size-10 p-[0.65rem] transition"
                    onClick={() => console.log('Repeat')}
                    disabled={!isActive || state?.disallows.toggling_repeat_context}
                >
                    <Repeat
                        className="size-full"
                        strokeWidth={2.2}
                    />
                </Button>
            </div>
            <div className="flex flex-row justify-center items-center gap-4 w-full">
                <span
                    className="min-w-6 md:min-w-7 text-center text-xs md:text-sm font-light text-zinc-800 dark:text-zinc-300 select-none">{msToDurationSeek(state?.position ?? 0)}</span>
                <Slider
                    defaultValue={[0]}
                    value={[state?.position ?? 0]}
                    onValueChange={(value) => player?.seek(value[0])}
                    max={state?.duration ?? 0}
                    step={1000}
                    disabled={!isActive}
                    className={cn(!isActive ? 'opacity-50' : '', 'max-w-full')}
                />
                <span
                    className="min-w-6 md:min-w-7 text-center text-xs md:text-sm font-light text-zinc-800 dark:text-zinc-300 select-none">{msToDurationSeek(state?.duration ?? 0)}</span>
            </div>
        </div>
    );
}