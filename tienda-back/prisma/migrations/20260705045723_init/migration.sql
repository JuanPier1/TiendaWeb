-- CreateTable
CREATE TABLE `categoria` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `registro` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Categoria_nombre_key`(`nombre`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `producto` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `precio` DOUBLE NOT NULL DEFAULT 0,
    `stock` INTEGER NOT NULL DEFAULT 0,
    `imagen` VARCHAR(191) NULL,
    `registro` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `categoriaId` INTEGER NOT NULL,

    UNIQUE INDEX `Producto_nombre_key`(`nombre`),
    INDEX `Producto_categoriaId_fkey`(`categoriaId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tarjeta` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `usuario` INTEGER NOT NULL,
    `titular` VARCHAR(191) NOT NULL,
    `numero` VARCHAR(191) NOT NULL,
    `cvv` VARCHAR(191) NOT NULL,
    `vencimiento` VARCHAR(191) NOT NULL,

    INDEX `Tarjeta_usuario_fkey`(`usuario`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usuario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `apellidos` VARCHAR(191) NOT NULL,
    `correo` VARCHAR(191) NOT NULL,
    `clave` VARCHAR(191) NOT NULL,
    `telefono` VARCHAR(191) NULL,
    `direccion` VARCHAR(191) NULL,
    `registro` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Usuario_correo_key`(`correo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `producto` ADD CONSTRAINT `Producto_categoriaId_fkey` FOREIGN KEY (`categoriaId`) REFERENCES `categoria`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tarjeta` ADD CONSTRAINT `Tarjeta_usuario_fkey` FOREIGN KEY (`usuario`) REFERENCES `usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
