ALTER TABLE "budgets" ALTER COLUMN "year" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "budgets" ALTER COLUMN "updated_at" DROP NOT NULL;