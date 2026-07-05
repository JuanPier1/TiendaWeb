import { Router, type Request, type Response } from 'express';
import { prisma } from "../lib/prisma";

const router: Router = Router();

//Una categoria
router.get("/categorias/:id", async (req: Request, res: Response) => {
    const { id } = req.params;

    if (typeof id !== "string") {
        return res.status(400).json({ error: "Falta el id" });
    }
    
    const categoria = await prisma.categoria.findFirst({
        where: {
            id: parseInt(id)
        },
        include: {
            producto: true
        }
    })

    if (!categoria) {
        return res.status(404).json({ error: "Categoría no encontrada" });
    }

    res.json(categoria);
    //res.send(categoria);
})

//Varias categorias
router.get("/categorias", async (req: Request, res: Response) => {
    const categorias = await prisma.categoria.findMany()
    res.json(categorias);
});

//Agregar
router.post("/categorias", async (req: Request, res: Response) => {
    const newcategoria = await prisma.categoria.create({
        data: req.body,
    });

    res.json(newcategoria);
});

//Modificar
router.put("/categorias/:id", async (req: Request, res: Response) => {
    const { id } = req.params;

    if (typeof id !== "string") {
        return res.status(400).json({ error: "Falta el id" });
    }
    
    const updatecategoria = await prisma.categoria.update({
        where: {
            id: parseInt(id)
        },
        data: req.body
    })
    
    res.json(updatecategoria);
})

//Eliminar
router.delete("/categorias/:id", async (req, res) => {
    const { id } = req.params;

    if (typeof id !== "string") {
        return res.status(400).json({ error: "Falta el id" });
    }
    
    try {
        const delCategoria = await prisma.categoria.delete({
        where: { id: parseInt(id) },
        });
        res.json(delCategoria);
    } catch (error: any) {
        if (error.code === "P2025") {
            return res.status(404).json({ error: "Categoría no encontrada" });
        } throw error;
    }
    //return res.json(delcategoria);
})

export default router