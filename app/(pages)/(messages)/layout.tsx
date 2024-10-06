import { redirect } from "next/navigation"

import { validateRequest } from "@/lib/auth"

interface LayoutProps {
    children: React.ReactNode
}

export default async function Layout({
    children 
}: LayoutProps) {
    const { user } = await validateRequest()

    if (!user) {
        return redirect("/auth")
    }

    return (
        <div>{children}</div>
    )
}