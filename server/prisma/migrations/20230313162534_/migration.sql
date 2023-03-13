-- CreateTable
CREATE TABLE "TriedEmbed" (
    "id" INTEGER NOT NULL,
    "posX" INTEGER NOT NULL,
    "posY" INTEGER NOT NULL,
    "hasBomb" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TriedEmbed_pkey" PRIMARY KEY ("id")
);
