/*
  Warnings:

  - You are about to drop the column `sessionId` on the `film` table. All the data in the column will be lost.
  - Added the required column `filmId` to the `Session` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `film` DROP FOREIGN KEY `Film_sessionId_fkey`;

-- DropIndex
DROP INDEX `Film_sessionId_key` ON `film`;

-- AlterTable
ALTER TABLE `film` DROP COLUMN `sessionId`;

-- AlterTable
ALTER TABLE `session` ADD COLUMN `filmId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Session` ADD CONSTRAINT `Session_filmId_fkey` FOREIGN KEY (`filmId`) REFERENCES `Film`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
