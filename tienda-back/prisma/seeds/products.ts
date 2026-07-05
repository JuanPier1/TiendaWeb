import { prisma } from "../../src/lib/prisma";

interface CategoriasIds {
    consolas: { id: number };
    accesorios: { id: number };
    juegos: { id: number };
    electronicos : { id: number };
}

function putImgPlaceholder( text:string ) {
    const link = `https://placehold.co/400x400?text=${encodeURIComponent(text)}`

    return link;
}

export async function seedProductos({ consolas, accesorios, juegos, electronicos }: CategoriasIds) {
    const productos = [
        { nombre: "Nintendo Switch", precio: 6999, stock: 15, categoriaId: consolas.id, imagen: "/demo/images/nintendo.png"  },
        { nombre: "PlayStation 5", precio: 12999, stock: 8, categoriaId: consolas.id, imagen: "/demo/images/play5.png" },
        { nombre: "Xbox Series X", precio: 11999, stock: 10, categoriaId: consolas.id, imagen: "/demo/images/xbox.jpg" },
        { nombre: "Control PlayStation DualSense", precio: 1499, stock: 30, categoriaId: accesorios.id, imagen: putImgPlaceholder("Control PlayStation 5") },
        { nombre: "Control Xbox Wireless", precio: 1299, stock: 25, categoriaId: accesorios.id, imagen: putImgPlaceholder("Control Xbox") },
        { nombre: "Audífonos Gamer", precio: 899, stock: 20, categoriaId: accesorios.id, imagen: putImgPlaceholder("Audífonos Gamer") },
        { nombre: "The Legend of Zelda", precio: 1399, stock: 12, categoriaId: juegos.id, imagen: putImgPlaceholder("The Legend of Zelda") },
        { nombre: "God of War Ragnarök", precio: 1199, stock: 18, categoriaId: juegos.id, imagen: putImgPlaceholder("God of War Ragnarök") },
        { nombre: "Elden Ring", precio: 1099, stock: 14, categoriaId: juegos.id, imagen: putImgPlaceholder("Elden Ring") },
        { nombre: "Mario Kart 9", precio: 1299, stock: 20, categoriaId: juegos.id, imagen: putImgPlaceholder("Mario Kart 9") },
        { nombre: "Ventilador Gamer", precio: 4000, stock: 0, categoriaId: electronicos.id, imagen: "/demo/images/ventilador.jpg" },
    ];

    for (const producto of productos) {
        await prisma.producto.upsert({
            where: { nombre: producto.nombre },
            update: producto,
            create: producto,
        });
    }

    return productos.length;
}