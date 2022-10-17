-- CreateEnum
CREATE TYPE "StatsTask" AS ENUM ('OPEN', 'IN_PROGRESS', 'PAUSED', 'CLOSED');

-- AlterTable
ALTER TABLE "tasks" ADD COLUMN     "status" "StatsTask" NOT NULL DEFAULT 'OPEN';
