/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Extra` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Varient` will be added. If there are existing duplicate values, this will fail.
  - Made the column `name` on table `Category` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `Extra` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `Varient` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Category" ALTER COLUMN "name" SET NOT NULL;

-- AlterTable
ALTER TABLE "Extra" ALTER COLUMN "name" SET NOT NULL;

-- AlterTable
ALTER TABLE "Varient" ALTER COLUMN "name" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Extra_name_key" ON "Extra"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Varient_name_key" ON "Varient"("name");
