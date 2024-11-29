import Image from "next/image"

export const LiveCard = () => {
    return (
        <div className="relative w-[320px] h- rounded-lg">
            <div className="size-[320px]">
                <Image
                    width={320}
                    height={320}
                    src="/images/img1.jpg"
                    alt=""
                    className="size-80 object-cover rounded-lg"
                />
            </div>
            <div className="absolute top-0 left-0 z-20 cursor-pointer p-4">
                <div className="rounded-lg p-1 bg-red-500">
                    <span className="text-white">LIVE</span>
                </div>
            </div>
        </div>
    ) 
}