import Image from "next/image"
import { Calendar, Clock } from "lucide-react"

import { Button } from "@/components/ui/button"

export const ScheduleCard = () => {
    return (
        <div className="max-w-[350px] flex flex-col gap-3 bg-gray-200 rounded-lg p-4">
            <h2 className="uppercase text-lg">black friday sale tips</h2>
            <div className="flex flex-start gap-2 items-center">
                <Image
                    width={48}
                    height={48}
                    src="/images/img4.jpg"
                    alt=""
                    className="size-12 object-cover rounded-full"
                />
                <div className="flex flex-col justify-center">
                    <span className="text-sm font-bold">Japhet Paul</span>
                    <span className="text-sm text-gray-400">5.2M Followers</span>
                </div>
            </div>
            <div className="flex flex-start gap-2 items-center">
                <Calendar size={16} />
                <span className="text-sm">Saturday, Nov 30, 2024</span>
            </div>
            <div className="flex flex-start gap-2 items-center">
                <Clock size={16} />
                <span className="text-sm">Friday, Nov 29, 2024</span>
            </div>
            <div>
                <Button className="bg-green-500" size="sm">
                    Subscribe
                </Button>
            </div>
        </div>
    )
}