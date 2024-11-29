import { Video } from "@/app/components/video/Video"
import { Comments } from "@/app/components/video/Comments"

interface VideoPageProps {
    params: {
        videoId: string
    }
}

export default function VideoPage ({
    params
}: VideoPageProps) {

    return (
        <div className="pt-16 h-screen p-6">
            <div className="h-full w-full rounded-lg grid grid-rows-2 sm:grid-rows-1 sm:grid-cols-2 border-2">
                <div className="h-full w-full flex justify-center items-center p-2">
                    <Video videoId={params.videoId} />
                </div>
                <div className="h-full w-full p-2">
                    <Comments videoId={params.videoId} />
                </div>
            </div>
        </div>
    )
}