import { Router, type Request, type Response } from 'express';
import { prisma } from "../../lib/prisma";

const router: Router = Router();

//Un usuario
router.get("/usuarios/:id", async (req, res) => {
    const usuario = await prisma.usuario.findFirst({
        where: {
            id: parseInt(req.params.id)
        },
        include: {
            tarjeta_tarjeta_usuarioTousuario: true
        }
    })
    res.send(usuario);
})

//Varios usuarios
router.get("/usuarios", async (req, res) => {
    const usuarios = await prisma.usuario.findMany()
    res.json(usuarios);
});

//Agregar
router.post("/usuarios", async (req, res) => {
    const newUsuario = await prisma.usuario.create({
        data: req.body,
    })
    return res.json(newUsuario)
});

//Modificar
router.put("/usuarios/:id", async (req, res) => {
    const updateUsuario = await prisma.usuario.update({
        where: {
            id: parseInt(req.params.id)
        },
        data: req.body
    })
    return res.json(updateUsuario);
})

//Eliminar
router.delete("/usuarios/:id", async (req, res) => {
    const delUsuario = await prisma.usuario.delete({
        where: {
            id: parseInt(req.params.id)
        }
    });
    if(!delUsuario){
        return res.status(404).json({ error: "404 not found"});
    }
    return res.json(delUsuario);
})

export default router