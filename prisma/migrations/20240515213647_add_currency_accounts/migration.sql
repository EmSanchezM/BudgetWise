/*
  Warnings:

  - Added the required column `currency` to the `Account` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Account" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "numberAccount" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "currency" TEXT NOT NULL,
    "balance" REAL NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Account" ("balance", "id", "name", "numberAccount", "type", "userId") SELECT "balance", "id", "name", "numberAccount", "type", "userId" FROM "Account";
DROP TABLE "Account";
ALTER TABLE "new_Account" RENAME TO "Account";
CREATE UNIQUE INDEX "Account_numberAccount_key" ON "Account"("numberAccount");
CREATE INDEX "Account_numberAccount_idx" ON "Account"("numberAccount");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
