import { type Request, type Response, type NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
    usuarioId?: number;
}

export function verificarToken(req: AuthRequest, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "No autorizado" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ error: "Token no proporcionado" });
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET as string) as unknown as { id: number };
        req.usuarioId = payload.id;
        next();
    } catch {
        return res.status(401).json({ error: "Token inválido o expirado" });
    }
}