/*
  Warnings:

  - Added the required column `hexColor` to the `job_category` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."job_category" ADD COLUMN     "hexColor" TEXT NOT NULL;
