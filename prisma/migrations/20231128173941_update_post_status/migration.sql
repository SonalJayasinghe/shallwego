/*
  Warnings:

  - You are about to alter the column `status` on the `Post` table. The data in that column could be lost. The data in that column will be cast from `TinyInt` to `Enum(EnumId(0))`.

*/
-- AlterTable
ALTER TABLE `Post` MODIFY `status` ENUM('WAITING', 'APPROVED', 'REJECTED') NOT NULL DEFAULT 'WAITING';
