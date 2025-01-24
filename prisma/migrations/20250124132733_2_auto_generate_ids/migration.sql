-- AlterTable
ALTER TABLE "public"."job_application" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();

-- AlterTable
ALTER TABLE "public"."job_category" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();

-- AlterTable
ALTER TABLE "public"."kanban_board" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();

-- AlterTable
ALTER TABLE "public"."shared_board_link" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();
