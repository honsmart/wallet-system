-- CreateTable
CREATE TABLE "walletTrasactionApproval" (
    "id" SERIAL NOT NULL,
    "currency" TEXT NOT NULL,
    "sender_wallet_id" TEXT NOT NULL,
    "receiver_wallet_id" TEXT NOT NULL,
    "historyFor" TEXT NOT NULL,
    "amount" TEXT NOT NULL,
    "transactionType" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'UnApproval',
    "adminApproval" BOOLEAN NOT NULL DEFAULT false,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "walletTrasactionApproval_pkey" PRIMARY KEY ("id")
);
