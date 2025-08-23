/*
  Warnings:

  - You are about to drop the column `name` on the `File` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."File" DROP COLUMN "name",
ADD COLUMN     "originalName" TEXT NOT NULL DEFAULT 'unknown',
ADD COLUMN     "storedName" TEXT NOT NULL DEFAULT 'unknown';
