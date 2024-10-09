"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"

import { startChat } from "@/app/actions/chat.actions"
import { useChatStore } from "@/store/chatStore"
import { toast } from "@/hooks/use-toast"

interface SearchResultsProps {
    searchResults: any[]
}

const messageUser = async (userId: string) => {
    const result = await startChat(userId)
    return result
}

export const SearchResults = ({
    searchResults
}: SearchResultsProps) => {

    const router = useRouter()
    const toggleIsSelectedChat = useChatStore((store) => store.toggleIsSelectedChat)
    const setSelectedChat = useChatStore((store) => store.setSelectedChat)
    const addChatMessages = useChatStore((store) => store.addChatMessages)

    const { mutate } = useMutation({
        mutationFn: messageUser,
        onSuccess: (data) => {
            toggleIsSelectedChat(true)
            setSelectedChat(data?.chat)
            addChatMessages([])
            router.push(`/messages/${data?.chat.id}`)
        },
        onError: (error) => {
            toast({
                variant: "destructive",
                description: error.message
            })
        }
    })

    const handleSearch = (userId: string) => {
        mutate(userId)
    }

    return (
        <div>
            {searchResults.length !== 0 ? (
                <div className="grid gap-y-[1rem]">
                {searchResults.map((user) => (
                    <div
                        key={user.id}
                        className="hover:bg-green-400 hover:text-white cursor-pointer rounded-lg"
                        onClick={() => handleSearch(user.id)}
                    >
                        <div
                            className="grid grid-cols-customize gap-2 h-[50px] overflow-hidden items-center"
                        >
                            <div className="ml-2">
                                <Image
                                    src={user.profilePictureUrl}
                                    width={40}
                                    height={40}
                                    alt=""
                                    className="rounded-full object-cover size-10"
                                />
                            </div>
                            <div className="p-2 flex justify-start">
                                <span className="text-sm">{user.username}</span>
                            </div>
                        </div>
                    </div>
                ))}
                </div>
            ) : (
                <div className="text-sm">
                    Seems like no results.
                </div>
            )}
        </div>
    )
}