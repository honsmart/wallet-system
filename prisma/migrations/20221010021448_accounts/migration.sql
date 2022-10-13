/*
  Warnings:

  - A unique constraint covering the columns `[phone_number]` on the table `Account` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `hashedRt` to the `Account` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "hashedRt" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Account_phone_number_key" ON "Account"("phone_number");
