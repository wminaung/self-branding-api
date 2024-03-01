-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "userId" TEXT,
ALTER COLUMN "discountPrice" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
