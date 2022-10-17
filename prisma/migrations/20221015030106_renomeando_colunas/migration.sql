/*
  Warnings:

  - You are about to drop the column `taskId` on the `pauses` table. All the data in the column will be lost.
  - You are about to drop the column `timesheetId` on the `tasks` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `timesheets` table. All the data in the column will be lost.
  - You are about to drop the column `emailVerified` on the `users` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `timesheets` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "pauses" DROP CONSTRAINT "pauses_taskId_fkey";

-- DropForeignKey
ALTER TABLE "tasks" DROP CONSTRAINT "tasks_timesheetId_fkey";

-- DropForeignKey
ALTER TABLE "timesheets" DROP CONSTRAINT "timesheets_userId_fkey";

-- AlterTable
ALTER TABLE "pauses" DROP COLUMN "taskId",
ADD COLUMN     "task_id" TEXT,
ALTER COLUMN "start" SET DATA TYPE TIMESTAMPTZ,
ALTER COLUMN "end" SET DATA TYPE TIMESTAMPTZ;

-- AlterTable
ALTER TABLE "tasks" DROP COLUMN "timesheetId",
ADD COLUMN     "timesheet_id" TEXT,
ALTER COLUMN "start" SET DATA TYPE TIMESTAMPTZ,
ALTER COLUMN "end" SET DATA TYPE TIMESTAMPTZ;

-- AlterTable
ALTER TABLE "timesheets" DROP COLUMN "userId",
ADD COLUMN     "user_id" TEXT NOT NULL,
ALTER COLUMN "date" SET DATA TYPE TIMESTAMPTZ;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "emailVerified",
ADD COLUMN     "email_verified" TIMESTAMP(3);

-- AddForeignKey
ALTER TABLE "timesheets" ADD CONSTRAINT "timesheets_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_timesheet_id_fkey" FOREIGN KEY ("timesheet_id") REFERENCES "timesheets"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pauses" ADD CONSTRAINT "pauses_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "tasks"("id") ON DELETE SET NULL ON UPDATE CASCADE;
