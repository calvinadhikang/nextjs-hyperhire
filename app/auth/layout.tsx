import { ReactNode } from "react";

export default function Layout({
    children
}: {
    children: ReactNode
}){
    return (
        <div className="w-screen h-screen flex items-center justify-center">
            <div className="max-w-sm w-full">{children}</div>
        </div>
    );
}