import { NextApiRequest } from "next";
import db from "@/app/lib/db";
import { NextApiResponseServerIo } from "@/types";
import { currentUser } from "@/lib/currentUser";
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
    const user = await currentUser();
    const { content } = req.body;
    const { chatId } = req.query;

    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    if (!chatId) {
      return res.status(400).json({ error: "Chat ID is missing" });
    }
    if (!content) {
      return res.status(400).json({ error: "Content is missing" });
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
      (chatUser) => chatUser.userId === user.id
    );

    if (!userFounded) {
      return res
        .status(400)
        .json({ error: "You are not a member to this chat" });
    }

    const message = await db
      .insert(messageTable)
      .values({
        id: messageId,
        sender: user.id,
        content,
        chat: chat.id,
      })
      .returning({
        id: messageTable.id,
        content: messageTable.content,
        createdAt: messageTable.createdAt,
      });

    const chatKey = `chat:${chatId}:messages`;

    res?.socket?.server?.io?.emit(chatKey, message);

    return res.status(200).json(message);
  } catch (error) {
    console.log("[MESSAGES_POST]", error);
    return res.status(500).json({ message: "Internal Error" });
  }
}
