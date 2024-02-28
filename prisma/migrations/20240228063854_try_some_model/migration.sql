/*
  Warnings:

  - The primary key for the `Profile` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_userId_fkey";

-- AlterTable
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Profile_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Profile_id_seq";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ADD COLUMN     "image" TEXT,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" TEXT,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Menu" (
    "id" TEXT NOT NULL,
    "name" TEXT,

    CONSTRAINT "Menu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Varient" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "menuId" TEXT,

    CONSTRAINT "Varient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Users_Menus_Categories" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "menuId" TEXT,
    "categoryId" TEXT,

    CONSTRAINT "Users_Menus_Categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Extras" (
    "id" TEXT NOT NULL,
    "name" TEXT,

    CONSTRAINT "Extras_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Menus_Extras" (
    "id" TEXT NOT NULL,
    "menuId" TEXT,
    "extrasId" TEXT,

    CONSTRAINT "Menus_Extras_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Varient" ADD CONSTRAINT "Varient_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "Menu"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Users_Menus_Categories" ADD CONSTRAINT "Users_Menus_Categories_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Users_Menus_Categories" ADD CONSTRAINT "Users_Menus_Categories_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "Menu"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Users_Menus_Categories" ADD CONSTRAINT "Users_Menus_Categories_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Menus_Extras" ADD CONSTRAINT "Menus_Extras_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "Menu"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Menus_Extras" ADD CONSTRAINT "Menus_Extras_extrasId_fkey" FOREIGN KEY ("extrasId") REFERENCES "Extras"("id") ON DELETE SET NULL ON UPDATE CASCADE;
