import Image from "next/image"

interface ChatProps {
    user: string
    avatar: string
    latestmessage: string
    time: string
}

export const Chat = ({
    user,
    avatar,
    latestmessage,
    time
}: ChatProps) => {
    return (
        <div className="grid grid-cols-customization gap-2 p-2 w-full">
            <div className="flex justify-start items-center gap-2">
                <Image
                    src={avatar}
                    alt=""
                    width={48}
                    height={48}
                    className="size-12 rounded-full"
                />
                <div className="flex flex-col justify-between items-start">
                    <span className="text-lg text-green-500">{user}</span>
                    <span className="text-sm truncate max-w-[220px]">{latestmessage}</span>
                </div>
            </div>
            <div className="flex justify-end w-full">
                <span className="font-extralight italic text-xs">
                    {time}
                </span>
            </div>
        </div>
    )
}