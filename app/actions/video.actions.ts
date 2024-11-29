"use server"

// https://d2q3rw0ca832q8.cloudfront.net/videos/mixkit-52452-video-52452-hd-ready.mp4
// https://d2q3rw0ca832q8.cloudfront.net/videos/mixkit-group-of-friends-partying-happily-4640-hd-ready.mp4
// https://d2q3rw0ca832q8.cloudfront.net/videos/mixkit-young-people-dancing-intensely-4606-hd-ready.mp4
// https://d2q3rw0ca832q8.cloudfront.net/videos/12072256_2160_3840_30fps.mp4
// https://d2q3rw0ca832q8.cloudfront.net/videos/99933-video-720.mp4

// We first deal with video and user feed, when a user posts a video, we store the video and populate
// their feed as well.
import { generateId } from "lucia"
import { categoryEnums, videoTable, feedTable, videoOnFeed, videoOnLikes } from "../lib/db/schema"
import { validateRequest } from "@/lib/auth"
import db from "../lib/db"
import { eq, and } from "drizzle-orm"

type videoType = {
    url: string,
    description?: string,
    category?: (typeof categoryEnums.enumValues)[number]
}

export const postVideo = async (video: videoType) => {

    const { user } = await validateRequest()
    if (!user) {
        return { error: "Unauthorized" }
    }

    const { url } = video
    if (!url) {
        return { error: "Video URL is required" }
    }

    try {
        const videoId = generateId(15)

        await db.insert(videoTable).values({
            id: videoId,
            userId: user.id,
            ...video
        })

        const userFeed = await db.query.feedTable.findFirst({
            where: (table) => eq(table.userId, user.id)
        })

        if (!userFeed) {
            const feedId = generateId(15)

            await db.insert(feedTable).values({
                id: feedId,
                userId: user.id,
            })

            await db.insert(videoOnFeed).values({
                videoId,
                feedId
            })
        }
        else {
            await db.insert(videoOnFeed).values({
                videoId,
                feedId: userFeed.id
            })
        }

        return {
            success: true
        }
    }
    catch(e: any) {
        return {
            success: false,
            message: e?.message
        }
    }
}

export const getVideo = async (videoId: string) => {
    const { user } = await validateRequest()
    if (!user) {
        return { error: "Unauthorized" }
    }

    if (!videoId) {
        return { error: "Video ID was not provided" }
    }

    try {
        const video = await db.query.videoTable.findFirst({
            where: (table) => eq(table.id, videoId),
        })

        if (!video) {
            return { error: "Invalid Video ID"}
        }

        return { 
            success: true,
            video: video
         }


    }
    catch(e: any) {
        return {
            success: false,
            message: e?.message
        }
    }
}

export const likeVideo = async (videoId: string) => {
    const { user } = await validateRequest();
    if (!user) {
        return { error: "Unauthorized" }
    }

    if (!videoId) {
        return { error: "Invalid request" }
    }

    try {
        await db.insert(videoOnLikes).values({
            videoId,
            likerId: user.id
        })

        return { success: true }
    }
    catch(e: any) {
        return {
            success: false,
            message: e?.message
        }
    }
}

export const unLikeVideo = async (videoId: string) => {
    const { user } = await validateRequest();
    if (!user) {
        return { error: "Unauthorized" }
    }

    if (!videoId) {
        return { error: "Invalid request" }
    }

    try {
        await db.delete(videoOnLikes).where(
            and(eq(videoOnLikes.videoId, videoId), eq(videoOnLikes.likerId, user.id))
        )

        return { success: true }
    }
    catch(e: any) {
        return {
            success: false,
            message: e?.message
        }
    }
}