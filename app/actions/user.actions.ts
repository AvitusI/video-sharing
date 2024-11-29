"use server";

import { validateRequest } from "@/lib/auth";
import { generateId } from "lucia";
import db from "../lib/db";
import { and, sql, eq } from "drizzle-orm";
import { followsTable, userTable, notificationTable } from "../lib/db/schema";

export const getUser = async () => {
    const { user } = await validateRequest();
    return user;
}

export const searchUser = async (username: string) => {
    if (!username) {
        return { error: "Username not provided" }
    }

    try {
        const searchResult = await db.query.userTable.findMany({
            where: (sql`to_tsvector('simple', ${userTable.username}) @@ to_tsquery('simple', ${username} || ':*')`),
        })

        return { result: searchResult }
    }
    catch (e: any) {
        return { error: e.message }
    }
}

export const followUser = async (id: string) => {
    const { user } = await validateRequest();
    if (!user) {
        return { error: "Unauthorized" }
    }

    if (!id) {
        return { error: "Invalid request" }
    }

    try {
        await db.insert(followsTable).values({
            followerId: id, // The user being followed(big doubt here)
            followingId: user.id
        })

        const generatedId = generateId(15)

        await db.insert(notificationTable).values({
            id: generatedId,
            userId: user.id,
            ownerId: id,
            type: "follow",
            content: `${user.username} started following you`
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

export const unFollowUser = async (id: string) => {
    const { user } = await validateRequest()
    if (!user) {
        return { error: "Unauthorized" }
    }

    if (!id) {
        return { error: "Invalid request" }
    }

    try {
        await db.delete(followsTable).where(
            and(eq(followsTable.followerId, user.id), eq(followsTable.followingId, id))
        )

        await db.delete(notificationTable).where(
            and(eq(notificationTable.userId, user.id), eq(notificationTable.ownerId, id), eq(notificationTable.type, "follow"))
        )

        return { success: true }
    }
    catch (e: any) {
        return {
            success: false,
            message: e?.message
        }
    }
}

export const getProfile = async (id: string) => {
    const { user } = await validateRequest()
    if (!user) {
        return { error: "Unauthorized" }
    }

    if (!id) {
        return { error: "Invalid request" }
    }

    try {
        const profile = await db.query.userTable.findFirst({
            where: (table) => eq(table.id, id),
            columns: {
                hashedPassword: false
            },
            with: {
                followers: {
                    columns: {
                        followerId: false,
                        followingId: false
                    },
                    with: {
                        follower: {
                            columns: {
                                hashedPassword: false
                            }
                        }
                    }
                },
                following: {
                    columns: {
                        followerId: false,
                        followingId: false
                    },
                    with: {
                        following: {
                            columns: {
                                hashedPassword: false
                            }
                        }
                    }
                }
            }
        })

        if (!profile) {
            return { error: "Invalid request" }
        }

        return {
            success: true,
            profile
        }
    }
    catch(e: any) {
        return {
            success: false,
            message: e?.message
        }
    }
}