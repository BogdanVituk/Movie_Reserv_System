/*
  Warnings:

  - Added the required column `posterUrl` to the `Film` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `film` ADD COLUMN `posterUrl` VARCHAR(191) NOT NULL;
