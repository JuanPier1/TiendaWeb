import { prisma } from "../../src/lib/prisma";
import { seedCategorias } from "./categories";
import { seedProductos } from "./products";

async function main() {
    const categorias = await seedCategorias();
    const total = await seedProductos(categorias);
    console.log(`Seed completado: ${total} productos, 4 categorías`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });