"use server"

import { validateRequest } from "@/lib/auth"
import { generateId } from "lucia"
import db from "../lib/db"
import { and, desc, eq } from "drizzle-orm"
import { commentOnLikes, commentTable } from "../lib/db/schema"

export const postComment = async (
    videoId: string,
    content: string
) => {
    const { user } = await validateRequest()
    if (!user) {
        return { error: "Unauthorized" }
    }

    if (!videoId || !content) {
        return { error: "Invalid request" }
    }

    try {
        const commentId = generateId(15)

        await db.insert(commentTable).values({
            id: commentId,
            userId: user.id,
            videoId,
            content
        })

        return { success: true }
    }
    catch (e: any) {
        return {
            success: false,
            message: e?.message
        }
    }
}

export const getComment = async (commentId: string) => {
    const { user } = await validateRequest();
    if (!user) {
        return { error: "Unauthorized" }
    }

    if (!commentId) {
        return { error: "Invalid request" }
    }

    try {
        const comment = await db.query.commentTable.findFirst({
            where: eq(commentTable.id, commentId),
            with: {
                user: {
                    columns: {
                        hashedPassword: false
                    }
                },
                likes: {
                    columns: {
                        commentId: false,
                        likerId: false
                    },
                    with: {
                        liker: {
                            columns: {
                                hashedPassword: false
                            }
                        }
                    }
                },
                replies: true
            }
        })

        if (!comment) {
            return { error: "Invalid comment ID" }
        }

        return {
            success: true,
            comment
        }
    }
    catch(e: any) {
        return { 
            success: false,
            message: e?.message
        }
    }
}

export const getComments = async (videoId: string) => {
    const { user } = await validateRequest();
    if (!user) {
        return { error: "Unauthorized" }
    }

    if (!videoId) {
        return { error: "Invalid request" }
    }

    try {
        const comments = await db.query.commentTable.findMany({
            where: (table) => eq(table.videoId, videoId),
            orderBy: [desc(commentTable.createdAt)],
            with: {
                user: {
                    columns: {
                        hashedPassword: false
                    }
                },
                likes: {
                    columns: {
                        commentId: false,
                        likerId: false
                    },
                    with: {
                        liker: {
                            columns: {
                                hashedPassword: false
                            }
                        }
                    }
                },
                replies: true
            }
        })

        if (!comments) {
            return { error: "Invalid video ID" }
        }

        return {
            success: true,
            comments
        }
    }
    catch(e: any) {
        return {
            success: false,
            message: e?.message
        }
    }
}

export const likeComment = async (commentId: string) => {
    const { user } = await validateRequest();
    if (!user) {
        return { error: "Unauthorized" }
    }

    if (!commentId) {
        return { error: "Invalid request" }
    }

    try {
        await db.insert(commentOnLikes).values({
            commentId,
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

export const unLikeComment = async (commentId: string) => {
    const { user } = await validateRequest();
    if (!user) {
        return { error: "Unauthorized" }
    }

    if (!commentId) {
        return { error: "Invalid request" }
    }

    try {
        await db.delete(commentOnLikes).where(
            and(eq(commentOnLikes.commentId, commentId), eq(commentOnLikes.likerId, user.id))
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