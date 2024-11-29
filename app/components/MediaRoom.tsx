"use client"

import { useEffect, useState } from "react"
import { LiveKitRoom, VideoConference } from "@livekit/components-react"
import "@livekit/components-styles"
import { Loader } from "lucide-react"

export const MediaRoom = () => {
    const [token, setToken] = useState("")

    // This will call our newly created livekit route and append the token inside the state
    useEffect(() => {
        const name = "Avitus Ibrahim";

        (async () => {
            try {
                const resp = await fetch(`/api/livekit?room=room1&username=${name}`)
                const data = await resp.json();
                setToken(data.token)
            }
            catch(e) {
                console.error(e)
            }
        })();
    }, [])

    if (token === "") {
        return (
            <div className="flex flex-col flex-1 justify-center items-center">
                <Loader className="h-7 w-7 text-zinc-500 animate-spin my-4" />
                <p className="text-xs text-zinc-500">
                    Loading...
                </p>
            </div>
        )
    }

    return (
        <LiveKitRoom
            data-lk-theme="default"
            serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
            token={token}
            connect={true}
            video={true}
            audio={true}
        >
            <VideoConference />
        </LiveKitRoom>
    )
}