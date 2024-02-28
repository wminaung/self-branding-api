/*
  Warnings:

  - You are about to drop the column `extrasId` on the `Menus_Extras` table. All the data in the column will be lost.
  - You are about to drop the `Extras` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Menus_Extras" DROP CONSTRAINT "Menus_Extras_extrasId_fkey";

-- AlterTable
ALTER TABLE "Menus_Extras" DROP COLUMN "extrasId",
ADD COLUMN     "extraId" TEXT;

-- DropTable
DROP TABLE "Extras";

-- CreateTable
CREATE TABLE "Extra" (
    "id" TEXT NOT NULL,
    "name" TEXT,

    CONSTRAINT "Extra_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Menus_Extras" ADD CONSTRAINT "Menus_Extras_extraId_fkey" FOREIGN KEY ("extraId") REFERENCES "Extra"("id") ON DELETE SET NULL ON UPDATE CASCADE;
