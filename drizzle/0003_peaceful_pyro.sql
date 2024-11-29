ALTER TABLE "notification" RENAME TO "notify";--> statement-breakpoint
ALTER TABLE "notify" DROP CONSTRAINT "notification_owner_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "notify" DROP CONSTRAINT "notification_user_id_user_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "notify" ADD CONSTRAINT "notify_owner_id_user_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "notify" ADD CONSTRAINT "notify_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
