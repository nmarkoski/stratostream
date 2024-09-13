import {cn} from "@/lib/utils";
import {Album, Artist, SimplifiedAlbum, Track} from "@spotify/web-api-ts-sdk";
import {AlbumCard, ArtistCard, SkeletonCard, TrackCard} from "@/components/spotify/cards";

function BaseGrid({children, className}: React.HTMLProps<HTMLDivElement>) {

    return(
        <div className={cn(className, 'grid gap-3 grid-cols-[repeat(auto-fit,minmax(9rem,max-content))] md:grid-cols-[repeat(auto-fit,minmax(10rem,max-content))]')}>
            {children}
        </div>
    );
}

export function ItemGrid({items, className}: {
    items: Track[] | Album[] | SimplifiedAlbum[] | Artist[];
} & React.HTMLProps<HTMLDivElement>) {

    const imgSizes = {
        base: '10vw',
        sm: '50vw',
        md: '25vw'
    }

    const styles = "md:max-w-[16rem]"

    return(
        <BaseGrid className={cn(className)}>
            {items.map((item, index) => {
                if(item.type === 'track') {
                    const track = item as Track;
                    return(
                        <TrackCard
                            key={track.id}
                            track={track}
                            imgSizes={imgSizes}
                            className={styles}
                        />
                    );
                } else if(item.type === 'album') {
                    const album = item as Album | SimplifiedAlbum;
                    return(
                        <AlbumCard
                            key={album.id}
                            album={album}
                            imgSizes={imgSizes}
                            className={styles}
                        />
                    );
                } else if(item.type === 'artist') {
                    const artist = item as Artist;
                    return(
                        <ArtistCard
                            key={artist.id}
                            artist={artist}
                            imgSizes={imgSizes}
                            className={styles}
                        />
                    );
                }
            })}
        </BaseGrid>
    );
}

export function SkeletonGrid({length, variant, className}: {
    length: number;
    variant: 1 | 2;
} & React.HTMLProps<HTMLDivElement>) {

    return (
        <div className={cn('grid gap-3 grid-cols-[repeat(auto-fit,minmax(9rem,1fr))] md:grid-cols-[repeat(auto-fit,minmax(10rem,1fr))]', className)}>
            {
                Array(length).fill(null).map((_, index) => (
                    <SkeletonCard
                        key={index}
                        variant={variant}
                    />
                ))
            }
        </div>
    );
}