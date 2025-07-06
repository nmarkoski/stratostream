"use client";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useTheme } from "next-themes";

export default function ThemeSelect() {
    const { theme, setTheme } = useTheme();

    return (
        <Select onValueChange={(value) => setTheme(value)}>
            <SelectTrigger className="w-36">
                <SelectValue placeholder="System" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectItem value="system">System</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="light">Light</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}
