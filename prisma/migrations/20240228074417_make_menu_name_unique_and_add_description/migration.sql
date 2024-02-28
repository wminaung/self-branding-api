/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Menu` will be added. If there are existing duplicate values, this will fail.
  - Made the column `name` on table `Menu` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Menu" ADD COLUMN     "description" TEXT,
ALTER COLUMN "name" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Menu_name_key" ON "Menu"("name");
