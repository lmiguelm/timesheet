-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "timesheets" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "total" DECIMAL(65,30) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "timesheets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tasks" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "start" TIMESTAMP(3) NOT NULL,
    "end" TIMESTAMP(3) NOT NULL,
    "total_with_pause" DECIMAL(65,30) NOT NULL,
    "total_without_pause" DECIMAL(65,30) NOT NULL,
    "total_pauses" DECIMAL(65,30) NOT NULL,
    "timesheetId" TEXT,

    CONSTRAINT "tasks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pauses" (
    "id" TEXT NOT NULL,
    "start" TIMESTAMP(3) NOT NULL,
    "end" TIMESTAMP(3) NOT NULL,
    "total" DECIMAL(65,30) NOT NULL,
    "taskId" TEXT,

    CONSTRAINT "pauses_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "timesheets" ADD CONSTRAINT "timesheets_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_timesheetId_fkey" FOREIGN KEY ("timesheetId") REFERENCES "timesheets"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pauses" ADD CONSTRAINT "pauses_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "tasks"("id") ON DELETE SET NULL ON UPDATE CASCADE;
