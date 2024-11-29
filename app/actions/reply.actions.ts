"use server";

import { validateRequest } from "@/lib/auth";
import { generateId } from "lucia";
import { replyTable } from "../lib/db/schema";
import db from "../lib/db";
import { eq } from "drizzle-orm";

export const postReply = async (
    commentId: string,
    content: string
) => {
    const { user } = await validateRequest();
    if (!user) {
        return { error: "Unauthorized" };
    }

    if (!commentId || !content) {
        return { error: "Invalid request" };
    }

    try {
        const replyId = generateId(15);

        await db.insert(replyTable).values({
            id: replyId,
            userId: user.id,
            commentId,
            content
        })

        return { success: true };
    }
    catch(e: any) {
        return {
            success: false,
            message: e?.message
        }
    }
}

export const getReplies = async (commentId: string) => {
    const { user } = await validateRequest();
    if (!user) {
        return { error: "Unauthorized" };
    }

    if (!commentId) {
        return { error: "Invalid request" };
    }

    try {
        const replies = await db.query.replyTable.findMany({
            where: (table) => eq(table.commentId, commentId),
            with: {
                user: {
                    columns: {
                        hashedPassword: false
                    }
                },
                likes: {
                    with: {
                        liker: {
                            columns: {
                                hashedPassword: false
                            }
                        }
                    }
                }
            }
        });

        return {
            success: true,
            replies
        }
    }
    catch(e: any) {
        return {
            success: false,
            message: e?.message
        }
    }
}