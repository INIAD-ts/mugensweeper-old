-- CreateEnum
CREATE TYPE "MouseBtn" AS ENUM ('left', 'right');

-- CreateTable
CREATE TABLE "User" (
    "userId" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "photoUrl" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "ClickHistory" (
    "clickHistoryId" INTEGER NOT NULL,
    "userId" TEXT,
    "createAt" TIMESTAMP(3) NOT NULL,
    "mouseBtn" "MouseBtn" NOT NULL,
    "posX" INTEGER NOT NULL,
    "posY" INTEGER NOT NULL,

    CONSTRAINT "ClickHistory_pkey" PRIMARY KEY ("clickHistoryId")
);

-- AddForeignKey
ALTER TABLE "ClickHistory" ADD CONSTRAINT "ClickHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE SET NULL ON UPDATE CASCADE;
