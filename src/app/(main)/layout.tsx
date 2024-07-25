import {Separator} from "@/components/ui/separator";
import Header from "@/app/(main)/Header";
import SeekbarWrapper from "@/app/(main)/SeekbarWrapper";

export default function Layout({children}: { children: React.ReactNode }) {

    return (
        <>
            <Header/>
            <Separator/>
            <div className="flex-1 flex flex-col overflow-auto slim-scroll">
                {children}
            </div>
            <Separator/>
            <SeekbarWrapper/>
        </>
    );
}
