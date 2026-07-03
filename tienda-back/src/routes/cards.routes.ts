import { Router, type Request, type Response } from 'express';
import { prisma } from "../../lib/prisma";

const router: Router = Router();

//Una tarjeta
router.get("/tarjetas/:id", async (req, res) => {
    const tarjeta = await prisma.tarjeta.findFirst({
        where: {
            id: parseInt(req.params.id)
        },
        include: {
            usuario_tarjeta_usuarioTousuario: true
        }
    })
    res.send(tarjeta);
})

//Varias tarjetas
router.get("/tarjetas", async (req, res) => {
    const tarjetas = await prisma.tarjeta.findMany()
    res.json(tarjetas);
});

//Agregar
router.post("/tarjetas", async (req, res) => {
    const newTarjeta = await prisma.tarjeta.create({
        data: req.body,
    })
    return res.json(newTarjeta)
});

//Modificar
router.put("/tarjetas/:id", async (req, res) => {
    const updateTarjeta = await prisma.tarjeta.update({
        where: {
            id: parseInt(req.params.id)
        },
        data: req.body
    })
    return res.json(updateTarjeta);
})

//Eliminar
router.delete("/tarjetas/:id", async (req, res) => {
    const delTarjeta = await prisma.tarjeta.delete({
        where: {
            id: parseInt(req.params.id)
        }
    });
    if(!delTarjeta){
        return res.status(404).json({ error: "404 not found"});
    }
    return res.json(delTarjeta);
})

export default router