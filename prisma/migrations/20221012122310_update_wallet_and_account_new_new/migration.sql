/*
  Warnings:

  - Added the required column `transactionID` to the `walletTrasactionApproval` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "walletTrasactionApproval" ADD COLUMN     "transactionID" TEXT NOT NULL;
