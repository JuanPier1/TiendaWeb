import { Router, type Request, type Response } from 'express';
import { prisma } from "../lib/prisma";

const router: Router = Router();

// Varios productos (con categoría incluida)
router.get("/productos", async (req: Request, res: Response) => {
    const productos = await prisma.producto.findMany({
        include: { categoria: true },
    });
    res.json(productos);
});

//Un producto
router.get("/productos/:id", async (req: Request, res: Response) => {
    const { id } = req.params;

    if (typeof id !== "string") {
        return res.status(400).json({ error: "Falta el id" });
    }

    const producto = await prisma.producto.findFirst({
        where: {
            id: parseInt(id)
        },
        include: {
            categoria: true
        }
    })

    if (!producto) {
        return res.status(404).json({ error: "Producto no encontrado" });
    }

    res.send(producto);
})

//Varios productos
{/*
router.get("/productos", async (req: Request, res: Response) => {
    const productos = await prisma.producto.findMany()
    res.json(productos);
});
*/}

//Agregar
router.post("/productos", async (req: Request, res: Response) => {
    const newProducto = await prisma.producto.create({
        data: req.body,
    })
    return res.json(newProducto)
});

//Modificar
router.put("/productos/:id", async (req: Request, res: Response) => {
    const { id } = req.params;

    if (typeof id !== "string") {
        return res.status(400).json({ error: "Falta el id" });
    }

    const updateProducto = await prisma.producto.update({
        where: {
            id: parseInt(id)
        },
        data: req.body
    })

    return res.json(updateProducto);
})

//Eliminar
router.delete("/productos/:id", async (req: Request, res: Response) => {
    const { id } = req.params;

    if (typeof id !== "string") {
        return res.status(400).json({ error: "Falta el id" });
    }

    try {
        const delProducto = await prisma.producto.delete({
        where: { id: parseInt(id) },
        });
        res.json(delProducto);
    } catch (error: any) {
        if (error.code === "P2025") {
            return res.status(404).json({ error: "Producto no encontrado" });
        } throw error;
    }
    //return res.json(delProducto);
})

export default router