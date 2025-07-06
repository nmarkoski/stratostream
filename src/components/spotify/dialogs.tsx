import { DialogProps } from "@radix-ui/react-dialog";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Album,
    Artist,
    SimplifiedAlbum,
    SimplifiedTrack,
    Track,
} from "@spotify/web-api-ts-sdk";
import { ItemCarousel } from "@/components/spotify/carousels";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export function ItemDialog({
    items,
    textData,
    children,
}: {
    items: Track[] | SimplifiedTrack[] | Album[] | SimplifiedAlbum[] | Artist[];
    textData: {
        default: string;
        empty: string;
    };
} & DialogProps) {
    return (
        <Dialog>
            {children}
            <DialogContent className="min-w-[57%] flex flex-col justify-center py-6">
                {items.length > 0 ? (
                    <>
                        <DialogTitle className="inline-block text-3xl font-bold text-wrap truncate md:pl-4 pb-3">
                            {textData.default}
                        </DialogTitle>
                        <div className="max-w-full">
                            <ItemCarousel items={items} slideVariant="half" />
                        </div>
                        <VisuallyHidden>
                            <DialogDescription>
                                {textData.default}
                            </DialogDescription>
                        </VisuallyHidden>
                    </>
                ) : (
                    <span className="inline-block text-3xl font-bold text-wrap truncate">
                        {textData.empty}
                    </span>
                )}
            </DialogContent>
        </Dialog>
    );
}
