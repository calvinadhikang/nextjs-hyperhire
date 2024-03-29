import { ReactNode } from "react";
import "../globals.css";


export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="w-screen h-screen flex items-center justify-center">
            <div className="max-w-sm w-full">{children}</div>
        </div>
    );
}