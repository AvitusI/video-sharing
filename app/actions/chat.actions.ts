"use server"

import { eq } from "drizzle-orm"
import { generateId } from "lucia"

import db from "../lib/db"
import { validateRequest } from "@/lib/auth"
import { chatTable, usersOnChat, userTable } from "../lib/db/schema"

// Tip: To retrieve users chats, don't retrieve based on userId, retrieve the chat if the logged in user id
// is found in the users array

export const startChat = async (otherUserId: string) => {

    const { user } = await validateRequest()

    if (!user) {
        return { error: "Unauthorized" }
    }

    if (!otherUserId) {
        return { error: "User ID not found" }
    }

    try {
        const otherUser = await db.query.userTable.findFirst({
            where: eq(userTable.id, otherUserId)
        })

        if (!otherUser) {
            return { error: "User not found" }
        }

        let isUserFounded = false
        let foundedChat = null
        const chats = await db.query.chatTable.findMany({
            where: (table) => eq(table.userId, user.id),
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
        })


        // Check if the chat between the user and the other user exists. If yes, return the chat
        chats.forEach((chat) => {
            if (chat.users.some((userObj) => userObj.user.id === otherUserId)) {
                isUserFounded = true
                foundedChat = chat
            }
        })

        if (isUserFounded) {
            return {
                success: true,
                chat: foundedChat
            }
        }

        // If the logged in user has no chats or if no chat between two users, create a new chat
        if (chats.length === 0 || !isUserFounded) {
            const chatId = generateId(15)

            await db.transaction(async (trx) => {
                const newChat = await trx.insert(chatTable).values({
                    id: chatId,
                    userId: user.id,
                }).returning()

                await trx.insert(usersOnChat).values({
                    userId: user.id,
                    chatId: chatId
                })

                await trx.insert(usersOnChat).values({
                    userId: otherUserId,
                    chatId
                })
                
                foundedChat = newChat
            })
            
            return {
                success: true,
                chat: foundedChat
            }
        }
    }
    catch(e: any) {
        console.log(e)
        return {
            success: false,
            chat: e?.message
        }
    }
}

export const retrieveChats = async () => {
    const { user } = await validateRequest()

    if (!user) {
        return { error: "Unauthorized" }
    }

    try {
        const userWithChats = await db.query.userTable.findFirst({
            where: (table) => eq(table.id, user.id),
            columns: {
                hashedPassword: false
            },
            with: {
                chats: {
                    columns: {
                        userId: false,
                        chatId: false
                    },
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
                }
            }
        })

        if (!userWithChats) {
            return { error: "user not found" }
        }

        return {
            success: true,
            result: userWithChats
        }
    }
    catch(e: any) {
        return {
            success: false,
            error: e?.message
        }
    }
}