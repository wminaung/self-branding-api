/*
  Warnings:

  - You are about to drop the `Dump` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Dump";

-- CreateTable
CREATE TABLE "dump_data" (
    "id" TEXT NOT NULL,
    "is_delete" BOOLEAN NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "dump_data_pkey" PRIMARY KEY ("id")
);
