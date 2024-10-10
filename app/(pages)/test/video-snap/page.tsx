import { VideoPostFull } from "@/app/components/VideoPostFull"

export default function Page() {
    return (
        <>
            <div className="fixed top-0 left-0 w-full h-16 bg-gray-900 text-white flex items-center justify-center z-50">
                <nav>
                    <ul className="flex space-x-6">
                        <li><a href="#" className="hover:underline">Home</a></li>
                        <li><a href="#" className="hover:underline">Videos</a></li>
                        <li><a href="#" className="hover:underline">Contact</a></li>
                    </ul>
                </nav>
            </div>

            <div className="pt-16 h-screen snap-y snap-mandatory overflow-y-scroll">  
                <section className="snap-start flex items-center justify-center h-screen bg-gray-800 text-white">
                    <VideoPostFull />
                </section>

                <section className="snap-start flex items-center justify-center h-screen bg-gray-800 text-white">
                    <VideoPostFull />
                </section>

                <section className="snap-start flex items-center justify-center h-screen bg-gray-800 text-white">
                    <VideoPostFull />
                </section>

                <section className="snap-start flex items-center justify-center h-screen bg-gray-800 text-white">
                    <VideoPostFull />
                </section>

                <section className="snap-start flex items-center justify-center h-screen bg-gray-800 text-white">
                    <VideoPostFull />
                </section>

                <section className="snap-start flex items-center justify-center h-screen bg-gray-800 text-white">
                    <VideoPostFull />
                </section>

                <section className="snap-start flex items-center justify-center h-screen bg-gray-800 text-white">
                    <VideoPostFull />
                </section>

                <section className="snap-start flex items-center justify-center h-screen bg-gray-800 text-white">
                    <VideoPostFull />
                </section>

                <section className="snap-start flex items-center justify-center h-screen bg-gray-800 text-white">
                    <VideoPostFull />
                </section>

                <section className="snap-start flex items-center justify-center h-screen bg-gray-800 text-white">
                    <VideoPostFull />
                </section>

                <section className="snap-start flex items-center justify-center h-screen bg-gray-800 text-white">
                    <VideoPostFull />
                </section>
            </div>
        </>
    )
}