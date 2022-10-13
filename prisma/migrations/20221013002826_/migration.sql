/*
  Warnings:

  - You are about to drop the `verification_token` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "verification_token";

-- CreateTable
CREATE TABLE "verificaion_token" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "verificaion_token_token_key" ON "verificaion_token"("token");

-- CreateIndex
CREATE UNIQUE INDEX "verificaion_token_identifier_token_key" ON "verificaion_token"("identifier", "token");
