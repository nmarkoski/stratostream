import SearchBar from "@/app/(main)/(search)/SearchBar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div className="flex-1 flex flex-col overflow-y-auto slim-scroll search-scroll">
                <SearchBar />
                {children}
            </div>
        </>
    );
}
