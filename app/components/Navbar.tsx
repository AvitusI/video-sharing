"use client"

import { Upload } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useCollapseStore } from "@/store/collapseStore"
import { SearchDialog } from "@/app/components/modals/SearchUser"

export const Navbar = () => {
    const isCollapsed = useCollapseStore((store) => store.isCollapsed)

    return (
        <div className={`p-2 fixed top-0 left-0 w-full h-16 bg-white shadow-lg text-black flex items-center justify-start gap-2 sm:justify-around ${isCollapsed ? "ml-[75px]" : "ml-[300px]"}`}>
            <SearchDialog />
            <Button size="lg" className="bg-green-500 hover:bg-green-400 transition duration-300 ease-in-out">
                <Upload />
                <span className="ml-3">Upload</span>
            </Button>
        </div>
    )
}