// export default function RootLayout({
//     children,
// }: Readonly<{
//     children: React.ReactNode;
// }>) {
//     return (
//         <div className="w-screen h-screen flex items-center justify-center">
//             <div className="max-w-sm w-full">{children}</div>
//         </div>
//     );
// }
                
import type { Metadata } from "next";
import "../globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Bookstore App",
    description: "Generated by create next app",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body className={inter.className}>
            <div className="w-screen h-screen flex items-center justify-center">
                <div className="max-w-sm w-full">{children}</div>
            </div>
        </body>
        </html>
    );
}