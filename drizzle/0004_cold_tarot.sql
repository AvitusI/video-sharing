CREATE TABLE IF NOT EXISTS "live_video" (
	"id" text PRIMARY KEY NOT NULL,
	"host" text NOT NULL,
	"subscriber" text,
	"description" text NOT NULL,
	"start_time" timestamp with time zone NOT NULL,
	"endTime" timestamp with time zone NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users_on_live_video" (
	"user_id" text NOT NULL,
	"live_video_id" text NOT NULL,
	CONSTRAINT "users_on_live_video_user_id_live_video_id_pk" PRIMARY KEY("user_id","live_video_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "live_video" ADD CONSTRAINT "live_video_host_user_id_fk" FOREIGN KEY ("host") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "live_video" ADD CONSTRAINT "live_video_subscriber_user_id_fk" FOREIGN KEY ("subscriber") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_on_live_video" ADD CONSTRAINT "users_on_live_video_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_on_live_video" ADD CONSTRAINT "users_on_live_video_live_video_id_live_video_id_fk" FOREIGN KEY ("live_video_id") REFERENCES "public"."live_video"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
