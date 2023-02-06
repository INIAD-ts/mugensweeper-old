-- CreateEnum
CREATE TYPE "MouseBtn" AS ENUM ('left', 'right');

-- CreateTable
CREATE TABLE "ClickHistory" (
    "clickHistoryId" INTEGER NOT NULL,
    "userId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "mouseBtn" "MouseBtn" NOT NULL,

    CONSTRAINT "ClickHistory_pkey" PRIMARY KEY ("clickHistoryId")
);

-- AddForeignKey
ALTER TABLE "ClickHistory" ADD CONSTRAINT "ClickHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE SET NULL ON UPDATE CASCADE;
