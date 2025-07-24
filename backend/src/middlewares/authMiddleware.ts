import { Request, Response, NextFunction } from "express";
import { PrismaClient } from '../../generated/prisma';
import * as jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET

export const authToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

    if (!token) {
        return res.status(401).json({ message: 'Authentication token required.' });
    }

    if (!JWT_SECRET) {
        console.error('JWT_SECRET is not defined for authentication middleware!');
        return res.status(500).json({ message: 'Server configuration error.' });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: "Invalid or Expired Token" });
        }

        (req as any).userId = (decoded as jwt.JwtPayload).userId;
        (req as any).userEmail = (decoded as jwt.JwtPayload).userEmail;

        next();
    })
}