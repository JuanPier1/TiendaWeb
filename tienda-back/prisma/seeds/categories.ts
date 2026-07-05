import { prisma } from "../../src/lib/prisma";

export async function seedCategorias() {
    const consolas = await prisma.categoria.upsert({
        where: { nombre: "Consolas" },
        update: {},
        create: { nombre: "Consolas" },
    });

    const accesorios = await prisma.categoria.upsert({
        where: { nombre: "Accesorios" },
        update: {},
        create: { nombre: "Accesorios" },
    });

    const juegos = await prisma.categoria.upsert({
        where: { nombre: "Juegos" },
        update: {},
        create: { nombre: "Juegos" },
    });

    const electronicos = await prisma.categoria.upsert({
        where: { nombre: "Electrónicos" },
        update: {},
        create: { nombre: "Electrónicos" },
    });

    return { consolas, accesorios, juegos, electronicos };
}