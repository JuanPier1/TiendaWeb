import { Router, type Request, type Response } from 'express';
import { prisma } from "../../lib/prisma";

const router: Router = Router();

//Un producto
router.get("/productos/:id", async (req, res) => {
    const producto = await prisma.producto.findFirst({
        where: {
            id: parseInt(req.params.id)
        },
        include: {
            categoria: true
        }
    })
    res.send(producto);
})

//Varios productos
router.get("/productos", async (req, res) => {
    const productos = await prisma.producto.findMany()
    res.json(productos);
});

//Agregar
router.post("/productos", async (req, res) => {
    const newProducto = await prisma.producto.create({
        data: req.body,
    })
    return res.json(newProducto)
});

//Modificar
router.put("/productos/:id", async (req, res) => {
    const updateProducto = await prisma.producto.update({
        where: {
            id: parseInt(req.params.id)
        },
        data: req.body
    })
    return res.json(updateProducto);
})

//Eliminar
router.delete("/productos/:id", async (req, res) => {
    const delProducto = await prisma.producto.delete({
        where: {
            id: parseInt(req.params.id)
        }
    });
    if(!delProducto){
        return res.status(404).json({ error: "404 not found"});
    }
    return res.json(delProducto);
})

export default router