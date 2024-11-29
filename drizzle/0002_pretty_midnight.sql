DO $$ BEGIN
 CREATE TYPE "public"."category" AS ENUM('singAndDance', 'comedy', 'gaming', 'relationship', 'sports', 'cooking', 'education', 'technology', 'animeAndComics', 'life', 'religion', 'other');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."notification" AS ENUM('follow', 'message', 'videoLike', 'commentLike', 'replyLike', 'commentVideo', 'replyComment');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "notification" (
	"id" text PRIMARY KEY NOT NULL,
	"owner_id" text NOT NULL,
	"user_id" text NOT NULL,
	"type" "notification" NOT NULL,
	"content" text NOT NULL,
	"read" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "default_video" text DEFAULT 'https://d2q3rw0ca832q8.cloudfront.net/videos/99933-video-720.mp4';--> statement-breakpoint
ALTER TABLE "video" ADD COLUMN "category" "category" DEFAULT 'other' NOT NULL;--> statement-breakpoint
ALTER TABLE "video" ADD COLUMN "message" text;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "notification" ADD CONSTRAINT "notification_owner_id_user_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "notification" ADD CONSTRAINT "notification_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
