import { Router, type Request, type Response } from 'express';
import { prisma } from "../lib/prisma";
import { verificarToken, type AuthRequest } from "../middlewares/auth.middleware";

const router: Router = Router();

//Un usuario
router.get("/usuarios/:id", verificarToken, async (req: AuthRequest, res: Response) => {
    const { id } = req.params;

    if (typeof id !== "string") {
        return res.status(400).json({ error: "Falta el id" });
    }

    if (!req.usuarioId) {
        return res.status(401).json({ error: "No autorizado" });
    }

    const idSolicitado = parseInt(id);

    if (idSolicitado !== req.usuarioId) {
        return res.status(403).json({ error: "Usuario: No autorizado" });
    }
    
    const usuario = await prisma.usuario.findFirst({
        where: {
            id: parseInt(id)
        },
        include: {
            tarjeta_tarjeta_usuarioTousuario: true
        }
    })

    if (!usuario) {
        return res.status(404).json({ error: "Usuario: no encontrado" });
    }

    //res.send(usuario);
    const { clave: _, ...usuarioSinClave } = usuario;
    res.json(usuarioSinClave);
});

//Varios usuarios  *Solo Dev*
{/*  
router.get("/usuarios", verificarToken, async (req: AuthRequest, res: Response) => {
    const usuarios = await prisma.usuario.findMany()
    const usuariosSinClave = usuarios.map(({ clave, ...resto }) => resto);
    res.json(usuariosSinClave);
    //res.json(usuarios);
});
*/}

//Agregar *Solo Dev*
{/* 
router.post("/usuarios", verificarToken, async (req: Request, res: Response) => {
    const newUsuario = await prisma.usuario.create({
        data: req.body,
    })
    const { clave, ...usuarioSinClave } = newUsuario;
    res.json(usuarioSinClave);
    //return res.json(newUsuario)
});
*/}

//Modificar
router.put("/usuarios/:id", verificarToken, async (req: AuthRequest, res: Response) => {
    const { id } = req.params;

    if (typeof id !== "string") {
        return res.status(400).json({ error: "Falta el id" });
    }

    if (!req.usuarioId) {
        return res.status(401).json({ error: "No autorizado" });
    }

    const idSolicitado = parseInt(id);

    if (idSolicitado !== req.usuarioId) {
        return res.status(403).json({ error: "No puedes modificar otro usuario" });
    }

    //Rehashear
    const { clave, ...datosPermitidos } = req.body;

    const updateUsuario = await prisma.usuario.update({
        where: {
            id: idSolicitado
        },
        data: datosPermitidos
    })
    
    const { clave: _, ...usuarioSinClave } = updateUsuario;
    return res.json(usuarioSinClave);
    //return res.json(updateUsuario);
});

//Eliminar
router.delete("/usuarios/:id", verificarToken, async (req: AuthRequest, res: Response) => {
    const { id } = req.params;

    if (typeof id !== "string") {
        return res.status(400).json({ error: "Falta el id" });
    }

    if (!req.usuarioId) {
        return res.status(401).json({ error: "No autorizado" });
    }

    const idSolicitado = parseInt(id);

    if (idSolicitado !== req.usuarioId) {
        return res.status(403).json({ error: "No puedes eliminar otro usuario" });
    }
    
    await prisma.usuario.delete({ where: { id: idSolicitado } });
    
    res.json({ mensaje: "Usuario eliminado" });
    //return res.json(delUsuario);
})

export default router