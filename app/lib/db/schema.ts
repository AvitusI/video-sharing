import { relations, sql } from "drizzle-orm";
import {
  boolean,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  primaryKey,
  index
} from "drizzle-orm/pg-core";

export const roleEnums = pgEnum("role", ["admin", "user"]);

export const userTable = pgTable("user", {
  id: text("id").primaryKey(),
  hashedPassword: text("hashed_password"),
  email: text("email").unique(),
  isEmailVerified: boolean("is_email_verified").notNull().default(false),
  profilePictureUrl: text("profile_picture_url").default(
    "https://utfs.io/f/f8359bdb-d065-4ce7-b0b1-886cce4992c7-gvfw81.jpg"
  ),
  username: text("username").notNull().default("Guest"),
  role: roleEnums("role").notNull().default("user"),
},
  (table) => ({
    userSearchIndex: index('user_search_index').using('gin', sql`to_tsvector('simple', ${table.username})`),
  })
);

export const magicLinkTable = pgTable("magic_link", {
  id: serial("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
  token: text("token").notNull(),
});

export const oauthAccountTable = pgTable("oauth_account", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
  provider: text("provider").notNull(),
  providerUserId: text("provider_user_id").notNull(),
  accessToken: text("access_token").notNull(),
  refreshToken: text("refresh_token"),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }),
});

export const emailVerificationTable = pgTable("email_verification", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
  code: text("code").notNull(),
  sentAt: timestamp("sent_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});

export const sessionTable = pgTable("session", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});

export const videoTable = pgTable("video", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
  url: text("url").notNull(),
  createdAt: timestamp("created_at", {
    withTimezone: true,
    mode: "date",
  })
    .notNull()
    .defaultNow(),
});

export const commentTable = pgTable("comment", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
  videoId: text("video_id")
    .notNull()
    .references(() => videoTable.id),
  content: text("content").notNull(),
  createdAt: timestamp("created_at", {
    withTimezone: true,
    mode: "date",
  })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", {
    withTimezone: true,
    mode: "date",
  })
    .notNull()
    .defaultNow(),
});

export const replyTable = pgTable("reply", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
  commentId: text("comment_id")
    .notNull()
    .references(() => commentTable.id),
  content: text("content").notNull(),
  createdAt: timestamp("created_at", {
    withTimezone: true,
    mode: "date",
  })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", {
    withTimezone: true,
    mode: "date",
  })
    .notNull()
    .defaultNow(),
});

export const feedTable = pgTable("feed", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
});

export const videoOnFeed = pgTable(
  "video_on_feed",
  {
    videoId: text("video_id")
      .notNull()
      .references(() => videoTable.id),
    feedId: text("feed_id")
      .notNull()
      .references(() => feedTable.id),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.videoId, t.feedId] }),
  })
);

export const userRelations = relations(userTable, ({ one, many }) => ({
  feed: one(feedTable, {
    fields: [userTable.id],
    references: [feedTable.userId],
  }),
  chats: many(usersOnChat),
  messages: many(messageTable),
  videos: many(videoTable),
  comments: many(commentTable),
  replies: many(replyTable),
  likedVideos: many(videoOnLikes),
  likedComments: many(commentOnLikes),
  likedReplies: many(replyOnLikes),
  followers: many(followsTable, {
    relationName: "followers",
  }),
  following: many(followsTable, {
    relationName: "following",
  }),
}));

export const commentRelations = relations(commentTable, ({ one, many }) => ({
  user: one(userTable, {
    fields: [commentTable.userId],
    references: [userTable.id],
  }),
  video: one(videoTable, {
    fields: [commentTable.videoId],
    references: [videoTable.id],
  }),
  replies: many(replyTable),
  likes: many(commentOnLikes),
}));

export const replyRelations = relations(replyTable, ({ one, many }) => ({
  user: one(userTable, {
    fields: [replyTable.userId],
    references: [userTable.id],
  }),
  comment: one(commentTable, {
    fields: [replyTable.commentId],
    references: [commentTable.id],
  }),
  likes: many(replyOnLikes),
}));

export const videoRelations = relations(videoTable, ({ one, many }) => ({
  user: one(userTable, {
    fields: [videoTable.userId],
    references: [userTable.id],
  }),
  feedVideos: many(videoOnFeed),
  comments: many(commentTable),
  likes: many(videoOnLikes),
}));

export const feedRelations = relations(feedTable, ({ many }) => ({
  feed: many(videoOnFeed),
}));

export const videoOnFeedRelations = relations(videoOnFeed, ({ one }) => ({
  video: one(videoTable, {
    fields: [videoOnFeed.videoId],
    references: [videoTable.id],
  }),
  feed: one(feedTable, {
    fields: [videoOnFeed.feedId],
    references: [feedTable.id],
  }),
}));

export const chatTable = pgTable("chat", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
  latestMessage: text("latest_message"),
  createdAt: timestamp("created_at", {
    withTimezone: true,
    mode: "date",
  })
    .notNull()
    .defaultNow(),
});

export const usersOnChat = pgTable(
  "user_on_chat",
  {
    userId: text("user_id")
      .notNull()
      .references(() => userTable.id),
    chatId: text("chat_id")
      .notNull()
      .references(() => chatTable.id),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.userId, t.chatId] }),
  })
);

export const chatRelations = relations(chatTable, ({ many }) => ({
  users: many(usersOnChat),
  messages: many(messageTable),
}));

export const usersOnChatRelations = relations(usersOnChat, ({ one }) => ({
  chat: one(chatTable, {
    fields: [usersOnChat.chatId],
    references: [chatTable.id],
  }),
  user: one(userTable, {
    fields: [usersOnChat.userId],
    references: [userTable.id],
  }),
}));

export const messageTable = pgTable("message", {
  id: text("id").primaryKey(),
  sender: text("sender")
    .notNull()
    .references(() => userTable.id),
  content: text("content").notNull(),
  chat: text("chat")
    .notNull()
    .references(() => chatTable.id),
  read: boolean("read").notNull().default(false),
  deleted: boolean("deleted").notNull().default(false),
  edited: boolean("edited").notNull().default(false),
  createdAt: timestamp("created_at", {
    withTimezone: true,
    mode: "date",
  })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", {
    withTimezone: true,
    mode: "date",
  })
    .notNull()
    .defaultNow(),
});

export const messageRelations = relations(messageTable, ({ one }) => ({
  chat: one(chatTable, {
    fields: [messageTable.chat],
    references: [chatTable.id],
  }),
  sender: one(userTable, {
    fields: [messageTable.sender],
    references: [userTable.id],
  }),
}));

export const videoOnLikes = pgTable(
  "video_likes",
  {
    videoId: text("video_id")
      .notNull()
      .references(() => videoTable.id),
    likerId: text("liker_id")
      .notNull()
      .references(() => userTable.id),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.videoId, t.likerId] }),
  })
);

export const videoOnLikesRelations = relations(videoOnLikes, ({ one }) => ({
  video: one(videoTable, {
    fields: [videoOnLikes.videoId],
    references: [videoTable.id],
  }),
  liker: one(userTable, {
    fields: [videoOnLikes.likerId],
    references: [userTable.id],
  }),
}));

export const commentOnLikes = pgTable(
  "comment_likes",
  {
    commentId: text("comment_id")
      .notNull()
      .references(() => commentTable.id),
    likerId: text("liker_id")
      .notNull()
      .references(() => userTable.id),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.commentId, t.likerId] }),
  })
);

export const commentOnLikesRelations = relations(commentOnLikes, ({ one }) => ({
  comment: one(commentTable, {
    fields: [commentOnLikes.commentId],
    references: [commentTable.id],
  }),
  liker: one(userTable, {
    fields: [commentOnLikes.likerId],
    references: [userTable.id],
  }),
}));

export const replyOnLikes = pgTable(
  "reply_likes",
  {
    replyId: text("reply_id")
      .notNull()
      .references(() => replyTable.id),
    likerId: text("liker_id")
      .notNull()
      .references(() => userTable.id),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.replyId, t.likerId] }),
  })
);

export const replyOnLikesRelations = relations(replyOnLikes, ({ one }) => ({
  reply: one(replyTable, {
    fields: [replyOnLikes.replyId],
    references: [replyTable.id],
  }),
  liker: one(userTable, {
    fields: [replyOnLikes.likerId],
    references: [userTable.id],
  }),
}));

export const followsTable = pgTable(
  "follows",
  {
    followerId: text("follower_id")
      .notNull()
      .references(() => userTable.id),
    followingId: text("following_id")
      .notNull()
      .references(() => userTable.id),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.followerId, t.followingId] }),
  })
);

export const followsTableRelations = relations(followsTable, ({ one }) => ({
  follower: one(userTable, {
    fields: [followsTable.followerId],
    references: [userTable.id],
    relationName: "followers",
  }),
  following: one(userTable, {
    fields: [followsTable.followingId],
    references: [userTable.id],
    relationName: "following",
  }),
}));

export type InsertUser = typeof userTable.$inferInsert
export type SelectUser = typeof userTable.$inferSelect

export type InsertChat = typeof chatTable.$inferInsert
export type SelectChat = typeof chatTable.$inferSelect

export type InsertMessage = typeof messageTable.$inferInsert
export type SelectMessage = typeof messageTable.$inferSelect