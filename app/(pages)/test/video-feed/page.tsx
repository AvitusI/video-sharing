import { VideoPostFull } from "@/app/components/VideoPostFull"

export default function Page() {
    return (
        <div className="h-screen flex justify-center p-2">
            <div className="relative h-full flex flex-col gap-20 py-16 snap-y snap-mandatory">
                <VideoPostFull />
                <VideoPostFull />
                <VideoPostFull />
                <VideoPostFull />
                <VideoPostFull />
                <VideoPostFull />
                <VideoPostFull />
            </div>
        </div>
    )
}
