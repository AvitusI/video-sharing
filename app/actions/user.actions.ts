"use server";

import { validateRequest } from "@/lib/auth";
import db from "../lib/db";
import { sql } from "drizzle-orm";
import { userTable } from "../lib/db/schema";

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