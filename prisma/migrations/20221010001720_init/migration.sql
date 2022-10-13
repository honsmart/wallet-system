-- CreateTable
CREATE TABLE "Wallet" (
    "id" SERIAL NOT NULL,
    "phone_number" TEXT NOT NULL,
    "currency" TEXT NOT NULL,
    "wallet_id" TEXT NOT NULL,
    "balance" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'active',
    "created" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Wallet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WalletHistory" (
    "id" SERIAL NOT NULL,
    "currency" TEXT NOT NULL,
    "sender_wallet_id" TEXT NOT NULL,
    "receiver_wallet_id" TEXT NOT NULL,
    "balance" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WalletHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Wallet_wallet_id_key" ON "Wallet"("wallet_id");
