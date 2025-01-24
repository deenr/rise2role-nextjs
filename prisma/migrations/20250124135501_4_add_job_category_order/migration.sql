/*
  Warnings:

  - Added the required column `order` to the `job_category` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."job_category" ADD COLUMN     "order" INTEGER NOT NULL;
