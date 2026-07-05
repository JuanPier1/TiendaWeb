import { Router, type Request, type Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../lib/prisma";

const router: Router = Router();

// Registro
router.post("/registro", async (req: Request, res: Response) => {
    try {
        const { nombre, apellidos, correo, clave } = req.body;

        const existente = await prisma.usuario.findFirst({ where: { correo } });
        if (existente) {
            return res.status(409).json({ error: "Ese correo ya está registrado" });
        }

        const passHasheado = await bcrypt.hash(clave, 10);

        const nuevoUsuario = await prisma.usuario.create({
            data: { nombre, apellidos, correo, clave: passHasheado },
        });

        // No devolver el HASH
        const { clave: _, ...usuarioSinPass } = nuevoUsuario;

        res.status(201).json(usuarioSinPass);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al registrar usuario" });
    }
});

// Login
router.post("/login", async (req: Request, res: Response) => {
    try {
        const { correo, clave } = req.body;

        const usuario = await prisma.usuario.findFirst({ where: { correo } });
        if (!usuario) {
            return res.status(401).json({ error: "Credenciales inválidas" });
        }

        const passValido = await bcrypt.compare(clave, usuario.clave);
        if (!passValido) {
            return res.status(401).json({ error: "Credenciales inválidas" });
        }

        const token = jwt.sign(
            { id: usuario.id, correo: usuario.correo },
            process.env.JWT_SECRET as string,
            { expiresIn: "7d" }
        );

        const { clave: _, ...usuarioSinPass } = usuario;

        res.json({ usuario: usuarioSinPass, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al iniciar sesión" });
    }
});

export default router;