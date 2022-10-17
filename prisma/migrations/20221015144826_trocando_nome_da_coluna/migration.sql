/*
  Warnings:

  - You are about to drop the column `date` on the `timesheets` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "timesheets" DROP COLUMN "date",
ADD COLUMN     "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP;
