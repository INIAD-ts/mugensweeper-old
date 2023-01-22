-- CreateTable
CREATE TABLE "User" (
    "userid" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "photoUrl" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userid")
);
