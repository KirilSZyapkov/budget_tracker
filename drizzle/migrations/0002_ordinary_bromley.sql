ALTER TABLE "categories" ALTER COLUMN "updated_at" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "entries" ALTER COLUMN "updated_at" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "months" ALTER COLUMN "month" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "months" ALTER COLUMN "salary_day" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "months" ALTER COLUMN "updated_at" DROP NOT NULL;