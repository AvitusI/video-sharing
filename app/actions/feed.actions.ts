"use server"

import { validateRequest } from "@/lib/auth"
import db from "../lib/db"
import { eq } from "drizzle-orm"

type FeedProp = {
    page: number
    limit?: number
}

export const getFeed = async (values: FeedProp) => {
    const { user } = await validateRequest()
    if (!user) {
        return { error: "Unauthorized" }
    }

    const page = values.page;
    const limit = values.limit || 5;

    try {
        const feed = await db.query.feedTable.findFirst({
            where: (table) => eq(table.userId, user.id),
            with: {
                feed: {
                    columns: {
                        feedId: false,
                        videoId: false
                    },
                    with: {
                        video: {                        
                            with: {
                                user: {
                                    columns: {
                                        hashedPassword: false
                                    }
                                },
                                likes: {
                                    columns: {
                                        videoId: false,
                                        likerId: false
                                    },
                                    with: {
                                        liker: {
                                            columns: {
                                                hashedPassword: false
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
            }
        })

        const feedVideos = feed?.feed;

        if (!feedVideos || feedVideos.length === 0) {
            return {
                items: [],
                hasNextPage: false,
                page: 1,
                totalPages: 1
            }
        }
        
        const totalVideos = feedVideos.length;

        const startIndex = (page - 1) * limit;

        const totalPages = Math.ceil(totalVideos / limit)

        const paginatedVideos = feedVideos.reverse().slice(startIndex, startIndex + limit)

        return {
            items: paginatedVideos,
            hasNextPage: page < totalPages,
            page,
            totalPages
        }
        
    }
    catch (e: any) {
        return {
            error: true,
            message: e?.message
        }
    }
}