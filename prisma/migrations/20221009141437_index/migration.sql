/*
  Warnings:

  - You are about to drop the column `phonenumber` on the `Account` table. All the data in the column will be lost.
  - Added the required column `phone_number` to the `Account` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Account" DROP COLUMN "phonenumber",
ADD COLUMN     "phone_number" TEXT NOT NULL,
ALTER COLUMN "role" SET DEFAULT 'USER';
