/*
  Warnings:

  - Added the required column `historyFor` to the `WalletHistory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "WalletHistory" ADD COLUMN     "historyFor" TEXT NOT NULL;
