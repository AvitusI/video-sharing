import { Play } from "lucide-react"

export const ExploreVideo = () => {
    return (
        <div className="relative w-[200px] h-[200px]">
            <video src="/videos/v1.mp4" className="w-[200px] h-[200px] object-cover rounded-lg overflow-hidden"/>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer">
                <Play className="text-white" />
            </div>
        </div>
    )
}