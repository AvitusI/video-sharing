"use client"

import { useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"

import { followUser, unFollowUser } from "@/app/actions/user.actions"

import { Button } from "@/components/ui/button"

interface FollowButtonProps {
    id: string
    hasBeenFollowed: boolean
}

export const FollowButton = ({
    id,
    hasBeenFollowed
}: FollowButtonProps) => {

    const router = useRouter();

    const followFunc = async () => {
        if (!hasBeenFollowed) {
            const result = await followUser(id)
            return result
        }
        else {
            const result = await unFollowUser(id)
            return result
        }
    }

    const { mutate } = useMutation({
        mutationFn: followFunc,
        onSuccess: () => {
            router.refresh()
        }
    })


    return (
        <Button 
            size="lg" 
            className="bg-green-500 text-white hover:bg-green-400 h-8 rounded-full"
            onClick={() => mutate()}
        >
            {hasBeenFollowed ? "Following" : "Follow"}
        </Button>
    )
}