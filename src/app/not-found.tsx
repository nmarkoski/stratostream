import BackButton from "@/app/BackButton";

export default function NotFound() {
    return (
        <div className="h-full flex flex-col items-center justify-center gap-6 md:gap-10">
            <h1 className="text-2xl md:text-5xl font-extrabold text-center">
                Oops!
                <br />
                Something went wrong.
            </h1>
            <BackButton />
        </div>
    );
}
