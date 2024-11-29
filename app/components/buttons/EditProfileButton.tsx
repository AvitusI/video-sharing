"use client"

import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"

interface EditProfileButtonProps {
    id: string;
}

export const EditProfileButton = ({
    id
}: EditProfileButtonProps) => {

    const router = useRouter();

    return (
        <Button
            size="lg"
            className="bg-green-500 text-white hover:bg-green-400 h-8 rounded-full"
            onClick={() => router.push(`/edit/profile/${id}`)}
        >
            Edit Profile
        </Button>
    )
}