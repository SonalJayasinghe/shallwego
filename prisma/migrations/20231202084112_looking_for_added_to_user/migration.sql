/*
  Warnings:

  - You are about to drop the column `lookingFor` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Post` DROP COLUMN `lookingFor`;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `lookingFor` BOOLEAN NOT NULL DEFAULT false;
