/*
  Warnings:

  - You are about to drop the column `phone_number` on the `Account` table. All the data in the column will be lost.
  - Added the required column `phonenumber` to the `Account` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Account" DROP COLUMN "phone_number",
ADD COLUMN     "phonenumber" TEXT NOT NULL;
