import { Router, type Request, type Response } from 'express';
import { prisma } from "../../lib/prisma";

const router: Router = Router();

//Una categoria
router.get("/categorias/:id", async (req, res) => {
    const categoria = await prisma.categoria.findFirst({
        where: {
            id: parseInt(req.params.id)
        },
        include: {
            producto: true
        }
    })
    res.send(categoria);
})

//Varias categorias
router.get("/categorias", async (req, res) => {
    const categorias = await prisma.categoria.findMany()
    res.json(categorias);
});

//Agregar
router.post("/categorias", async (req, res) => {
    const newcategoria = await prisma.categoria.create({
        data: req.body,
    })
    return res.json(newcategoria)
});

//Modificar
router.put("/categorias/:id", async (req, res) => {
    const updatecategoria = await prisma.categoria.update({
        where: {
            id: parseInt(req.params.id)
        },
        data: req.body
    })
    return res.json(updatecategoria);
})

//Eliminar
router.delete("/categorias/:id", async (req, res) => {
    const delcategoria = await prisma.categoria.delete({
        where: {
            id: parseInt(req.params.id)
        }
    });
    if(!delcategoria){
        return res.status(404).json({ error: "404 not found"});
    }
    return res.json(delcategoria);
})

export default router