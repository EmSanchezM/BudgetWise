/*
  Warnings:

  - A unique constraint covering the columns `[numberAccount]` on the table `Account` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Account_numberAccount_key" ON "Account"("numberAccount");

-- CreateIndex
CREATE INDEX "Account_numberAccount_idx" ON "Account"("numberAccount");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");
