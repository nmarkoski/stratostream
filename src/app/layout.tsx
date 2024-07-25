import type {Metadata, Viewport} from "next";
import {Inter} from "next/font/google";
import "@/app/globals.css";
import {ThemeProvider} from "@/components/theme-provider";
import {cn} from "@/lib/utils";
import {Toaster} from "@/components/ui/toaster";

const inter = Inter({subsets: ['latin'], weight: 'variable'});

export const viewport: Viewport = {
    initialScale: 1,
    width: 'device-width',
    userScalable: false,
}

export const metadata: Metadata = {
    title: "Stratostream"
};

export default function RootLayout({children}: { children: React.ReactNode }) {

    return (
        <html lang="en" suppressHydrationWarning>
        <body className={cn(inter.className, 'antialiased')}>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <main
                className="flex flex-col h-dvh overflow-hidden bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-200 bg-gradient-to-t from-slate-100/70 dark:from-slate-800/10 to-slate-100/30 dark:to-slate-800/10 dark:via-zinc-950">
                {children}
            </main>
            <Toaster />
        </ThemeProvider>
        </body>
        </html>
    );
}
