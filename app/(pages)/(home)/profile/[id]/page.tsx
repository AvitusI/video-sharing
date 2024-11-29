import Image from "next/image"
import { SquarePlay } from "lucide-react"

import { getProfile } from "@/app/actions/user.actions"
import { ProfileVideoCard } from "@/app/components/ProfileVideoCard"
import { FollowButton } from "../../../../components/buttons/FollowButton"
import { MessageButton } from "@/app/components/buttons/MessageButton"
import { EditProfileButton } from "@/app/components/buttons/EditProfileButton"
import { validateRequest } from "@/lib/auth"

const profile = {
  username: "Rosemary",
  avatar: "/images/her.jpg",
  bio: "I am a fashion designer and I love to create beautiful designs",
  followers: 256760,
  following: 150,
  videos: 1200
}

const arr = Array(10).fill(0).map((_, i) => i + 1)

interface ProfileProps {
  params: {
    id: string
  }
}


export default async function Profile({
  params
}: ProfileProps) {

  // User profile
  const result = await getProfile(params.id);

  console.log(result.profile);

  // Loged in user profile
  const { user } = await validateRequest();

  const hasBeenFollowed = result.profile?.followers.some((follower) => follower.follower.id === user?.id) || false;

  const isSameUser = result.profile?.id === user?.id;

  return (
    <div className="mt-16 flex justify-center">
      <div className="p-2 max-w-[400px]">
        <div className="flex justify-center">
          <Image
            src={result.profile?.profilePictureUrl as string}
            alt=""
            width={80}
            height={80}
            className="size-20 rounded-full object-cover"
          />
        </div>
        <div className="mt-4 text-center">
          <h1 className="text-2xl font-bold mb-2">{result.profile?.username}</h1>
          <p className="text-gray-500">{profile.bio}</p>
        </div>
        <div className="mt-4 justify-center items-center w-full">
          <div className="grid grid-cols-3 items-center">
            <div className="flex flex-col items-center">
              <h2 className="font-bold text-xl">{(result.profile?.followers.length || 0) > 1000 ? `${Math.round(((result.profile?.followers.length || 0) / 1000) * 10) / 10 }K` : (result.profile?.followers.length || 0)}</h2>
              <p className="text-gray-500 text-sm">Followers</p>
            </div>
            <div className="flex flex-col items-center">
              <h2 className="font-bold text-xl">{(result.profile?.following.length || 0) > 1000 ? `${((result.profile?.following.length || 0) / 1000).toFixed(1)}K` : (result.profile?.following.length || 0) }</h2>
              <p className="text-gray-500 text-sm">Following</p>
            </div>
            <div className="flex flex-col items-center">
              <h2 className="font-bold text-xl">{profile?.videos > 1000 ? `${(profile.videos / 1000).toFixed(1)}K` : profile?.videos}</h2>
              <p className="text-gray-500 text-sm">Videos</p>
            </div>
          </div>
        </div>

        <div className="mt-6">
          {isSameUser ? (
            <div className="flex justify-start gap-4">
              <EditProfileButton id={params.id} />
            </div>
          ) : (
            <div className="flex justify-between items-center gap-4">
              <FollowButton id={params.id} hasBeenFollowed={hasBeenFollowed} />
              <MessageButton id={params.id} />
            </div>
            )
          }
        </div>

        <div className="flex flex-col gap-2 mt-10 overflow-auto">
          <div className="h-10 bg-gray-300 rounded-full flex justify-center items-center gap-2 border-b-4 border-b-green-500">
            <SquarePlay />
            <span>Media</span>
          </div>
          <div className="flex justify-center">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {arr.map((elm, i) => (
                <ProfileVideoCard key={i} />
              ))}
            </div>
          </div>
        </div>
    </div>
    </div>
  )
}
