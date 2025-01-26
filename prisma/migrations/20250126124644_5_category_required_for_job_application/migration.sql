/*
  Warnings:

  - Made the column `category_id` on table `job_application` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "public"."job_application" DROP CONSTRAINT "job_application_category_id_fkey";

-- AlterTable
ALTER TABLE "public"."job_application" ALTER COLUMN "category_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."job_application" ADD CONSTRAINT "job_application_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "public"."job_category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
