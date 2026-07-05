import { Router, type Request, type Response } from 'express';
import { prisma } from "../lib/prisma";
import { verificarToken, type AuthRequest } from "../middlewares/auth.middleware";

const router: Router = Router();

//Una tarjeta
router.get("/tarjetas/:id", verificarToken, async (req: AuthRequest, res: Response) => {
    const { id } = req.params;

    if (typeof id !== "string") {
        return res.status(400).json({ error: "Falta el id" });
    }

    if (!req.usuarioId) {
        return res.status(401).json({ error: "No autorizado" });
    }
    
    const tarjeta = await prisma.tarjeta.findFirst({
        where: {
            id:  parseInt(id),
            usuario: req.usuarioId,
        },
        include: {
            usuario_tarjeta_usuarioTousuario: true
        }
    })

    if (!tarjeta) {
        return res.status(404).json({ error: "Tarjeta no encontrada" });
    }

    res.json(tarjeta);
})

//Varias tarjetas
router.get("/tarjetas", verificarToken, async (req: AuthRequest, res: Response) => {
    if (!req.usuarioId) {
        return res.status(401).json({ error: "No autorizado" });
    }
    
    const tarjetas = await prisma.tarjeta.findMany({
        where: {
            usuario: req.usuarioId,
        },
    })
    res.json(tarjetas);
});

//Agregar
router.post("/tarjetas", verificarToken, async (req: AuthRequest, res: Response) => {
    const newTarjeta = await prisma.tarjeta.create({
        data: {
            numero: req.body.numero,
            titular: req.body.titular,
            vencimiento: req.body.vencimiento,
            cvv: req.body.cvv,
            usuario: req.usuarioId as number,
        },
    })
    res.json(newTarjeta)
});

//Modificar
router.put("/tarjetas/:id", verificarToken, async (req: AuthRequest, res: Response) => {
    const { id } = req.params;

    if (typeof id !== "string") {
        return res.status(400).json({ error: "Falta el id" });
    }

    if (!req.usuarioId) {
        return res.status(401).json({ error: "No autorizado" });
    }

    const tarjetaExistente = await prisma.tarjeta.findFirst({
        where: { id: parseInt(id), usuario: req.usuarioId },
    });

    if (!tarjetaExistente) {
        return res.status(404).json({ error: "Tarjeta no encontrada" });
    }
    
    const updateTarjeta = await prisma.tarjeta.update({
        where: {
            id: parseInt(id)
        },
        data: req.body
    })
    res.json(updateTarjeta);
})

//Eliminar
router.delete("/tarjetas/:id", verificarToken, async (req:AuthRequest, res:Response) => {
    const { id } = req.params;

    if (typeof id !== "string") {
        return res.status(400).json({ error: "Falta el id" });
    }

    if (!req.usuarioId) {
        return res.status(401).json({ error: "No autorizado" });
    }
    
    const delTarjeta = await prisma.tarjeta.deleteMany({
        where: {
            id: parseInt(id),
            usuario: req.usuarioId,
        }
    });

    if (delTarjeta.count === 0) {
        return res.status(404).json({ error: "Tarjeta no encontrada" });
    }

    res.json({ mensaje: "Tarjeta eliminada" });
})

export default router