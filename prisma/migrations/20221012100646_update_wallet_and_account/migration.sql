/*
  Warnings:

  - You are about to drop the column `balance` on the `WalletHistory` table. All the data in the column will be lost.
  - Added the required column `amount` to the `WalletHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transactionType` to the `WalletHistory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "WalletHistory" DROP COLUMN "balance",
ADD COLUMN     "adminApproval" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "amount" TEXT NOT NULL,
ADD COLUMN     "completed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "transactionType" TEXT NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'Pending';
