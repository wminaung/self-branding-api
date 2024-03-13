-- CreateTable
CREATE TABLE "Dump" (
    "id" TEXT NOT NULL,
    "is_delete" BOOLEAN NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "Dump_pkey" PRIMARY KEY ("id")
);
