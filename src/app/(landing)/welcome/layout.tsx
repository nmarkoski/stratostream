import type {Metadata} from "next";

export const metadata: Metadata = {
    title: "Stratostream - Sign In"
};

export default function Layout({children}: { children: React.ReactNode }) {
    return (
        <>
            <main className="flex-grow flex justify-center items-center overflow-y-auto">
                {children}
            </main>
        </>
    );
}