/*
  Warnings:

  - Added the required column `titular` to the `tarjeta` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `tarjeta` ADD COLUMN `titular` VARCHAR(191) NOT NULL,
    MODIFY `numero` VARCHAR(191) NOT NULL,
    MODIFY `cvv` VARCHAR(191) NOT NULL,
    MODIFY `vencimiento` VARCHAR(191) NOT NULL;
