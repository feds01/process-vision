import "./globals.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { ClientProvider } from "@/components/QueryProvider";

const roboto = Roboto({
    weight: "400",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Carbon App",
    description: "Carbon App",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClientProvider>
            <html lang="en">
                <body className={roboto.className}>{children}</body>
            </html>
        </ClientProvider>
    );
}
