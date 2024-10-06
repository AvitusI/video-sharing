import { NextResponse } from "next/server";

import { currentUser } from "@/lib/currentUser";
import db from "@/app/lib/db";
import { eq } from "drizzle-orm";

export async function GET(
    req: Request
) {
    try {
        const user = await currentUser()
        const { searchParams } = new URL(req.url)

        const chatId = searchParams.get("chatId")

        if (!user) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        if (!chatId) {
            return new NextResponse("ChatID not found", { status: 400 })
        }

        const messages = await db.query.messageTable.findMany({
            where: (table) => eq(table.chat, chatId as string),
            with: {
                chat: {
                    with: {
                        users: {
                            columns: {
                                userId: false,
                                chatId: false
                            },
                            with: {
                                user: {
                                    columns: {
                                        hashedPassword: false
                                    }
                                }
                            }
                        }
                    }
                }
            }
        })

        if (!messages) {
            return new NextResponse("Failed to retrieve messages", { status: 400 })
        }

        return NextResponse.json({
            messages
        })
    }
    catch (error) {
        console.log("[MESSAGES_GET]", error);
        return new NextResponse("Internal Error", { status: 500 })
    }
}