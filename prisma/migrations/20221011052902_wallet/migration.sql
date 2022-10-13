/*
  Warnings:

  - A unique constraint covering the columns `[phone_number]` on the table `Wallet` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Wallet" ALTER COLUMN "balance" SET DEFAULT '0';

-- CreateIndex
CREATE UNIQUE INDEX "Wallet_phone_number_key" ON "Wallet"("phone_number");
