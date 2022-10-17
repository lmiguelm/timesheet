/*
  Warnings:

  - The `status` column on the `tasks` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "StatusTask" AS ENUM ('OPEN', 'IN_PROGRESS', 'PAUSED', 'CLOSED');

-- AlterTable
ALTER TABLE "tasks" DROP COLUMN "status",
ADD COLUMN     "status" "StatusTask" NOT NULL DEFAULT 'OPEN';

-- DropEnum
DROP TYPE "StatsTask";
