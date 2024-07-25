import {Button} from "@/components/ui/button";
import {ChevronLeft} from "lucide-react";
import Link from "next/link";

// Either simulate back or return to root route with href
export default function BackButton() {
    return (
        <Button asChild>
            <Link href="/">
                <ChevronLeft strokeWidth="0.15rem" className="mr-2 h-4 w-4"/>
                Go Back
            </Link>
        </Button>
    );
}