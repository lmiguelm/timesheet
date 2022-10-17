/*
  Warnings:

  - You are about to alter the column `total` on the `pauses` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `total_with_pause` on the `tasks` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `total_without_pause` on the `tasks` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `total_pauses` on the `tasks` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `total` on the `timesheets` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.

*/
-- AlterTable
ALTER TABLE "pauses" ALTER COLUMN "total" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "tasks" ALTER COLUMN "total_with_pause" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "total_without_pause" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "total_pauses" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "timesheets" ALTER COLUMN "total" SET DATA TYPE DOUBLE PRECISION;
