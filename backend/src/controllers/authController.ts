import { Request, Response } from 'express';
import { PrismaClient } from '../../generated/prisma';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET;

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    // Jika email atau password kosong
    if (!email || !password) {
        return res.status(400).json({message: "Email dan Password harap diisi."});
    }

    try {
        // Mencari data
        const user = await prisma.user.findUnique({
            where: { email: email },
        })

        // Jika email salah
        if (!user) {
            return res.status(400).json({message: "User atau Password salah."});
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)

        // Jika password salah
        if (!isPasswordValid) {
            return res.status(400).json({message: "User atau Password salah."});
        }

        // Membuat JWT token
        const token = jwt.sign({userId: user.id, userEmail: user.email}, JWT_SECRET, { expiresIn: "1h" });

        // Respon berhasil
        res.status(200).json({message: "Login sukses.", token, userId: user.id,  userEmail: user.email});
    }
    catch (err) {
        console.error("Error saat mencoba login ", err);
        res.status(500).json({message: "Login gagal. Silahkan coba lagi."});
    }
}
