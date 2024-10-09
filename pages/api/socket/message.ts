import { NextApiRequest } from "next";
import db from "@/app/lib/db";
import { NextApiResponseServerIo } from "@/types";
import { eq } from "drizzle-orm";
import { messageTable } from "@/app/lib/db/schema";
import { generateId } from "lucia";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponseServerIo
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    /*
    const { user}  = await validateRequest()
    The above won't work. Seems like there is a different wat to implement
    lucia in Pages API. Try to get the user state from Zustand store.
    Or can we access the session object in cookies ?
    */
    const { content } = req.body;
    const { chatId } = req.query;
    const { userId } = req.query

    if (!chatId) {
      return res.status(400).json({ error: "Chat ID is missing" });
    }
    if (!content) {
      return res.status(400).json({ error: "Content is missing" });
    }
    if(!userId) {
      return res.status(400).json({ error: "Unauthorized" });
    }

    const messageId = generateId(15);

    // Checking if the user is part of the chat
    const chat = await db.query.chatTable.findFirst({
      where: (table) => eq(table.id, chatId as string),
      with: {
        users: true,
      },
    });

    if (!chat) {
      return res.status(400).json({ error: "Chat not found" });
    }

    const userFounded = chat?.users.some(
      (chatUser) => chatUser.userId === userId
    );

    if (!userFounded) {
      return res
        .status(400)
        .json({ error: "You are not a member to this chat" });
    }

    let createdMessage = null;

    await db.transaction(async (trx) => {
      const message = await trx
        .insert(messageTable)
        .values({
          id: messageId,
          sender: userId as string,
          content,
          chat: chat.id,
        })
      
      if (message.rowCount === 0) {
        trx.rollback();
        return res.status(500).json({ message: "Internal Error Occured" });
      }

      const messageWithChat = await trx.query.messageTable.findFirst({
        where: (table) => eq(table.id, messageId),
        with: {
          chat: {
            with: {
              users: {
                columns: {
                  userId: false,
                  chatId: false,
                },
                with: {
                  user: {
                    columns: {
                      hashedPassword: false,
                    }
                  }
                }
              }
            }
          }
        }
      })

      createdMessage = messageWithChat;

    })

    const chatKey = `chat:${chatId}:messages`;

    res?.socket?.server?.io?.emit(chatKey, createdMessage);

    return res.status(200).json(createdMessage);
  } catch (error) {
    console.log("[MESSAGES_POST]", error);
    return res.status(500).json({ message: "Internal Error" });
  }
}
