import User from '@/models/User';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


const handleLogin = async (req: Request, res: Response) => {
    const { username, password } = req.body as { username: string, password: string };
    if (!username || !password) { res.status(400).send("Identifiant et/ou mot de passe manquant(s)."); return; }

    const user = await User.findOne({ email: username });
    if(!user || !user.password) { res.status(401).send("Identifiant et/ou mot de passe incorrect(s)."); return; }

    const valid = await bcrypt.compare(password, user.password);
    if(!valid) { res.status(401).send("Identifiant et/ou mot de passe incorrect(s)."); return; }

    const accessTokenPayload = {
        "id": user.id,
        "firstName": user.firstName,
        "lastName": user.lastName,
        "email": user.email,
        "roles": user.roles
    }
    if(!process.env.ACCESS_TOKEN_SECRET) throw new Error("ACCESS_TOKEN_SECRET NOT FOUND");
    const accessToken = jwt.sign(
        accessTokenPayload,
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '30m' }
    );

    const refreshTokenPayload = {
        "id": user.id
    }
    if(!process.env.REFRESH_TOKEN_SECRET) throw new Error("REFRESH_TOKEN_SECRET NOT FOUND");
    const refreshToken = jwt.sign(
        refreshTokenPayload,
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '3d' }
    )

    await User.findOneAndUpdate(
        { username: username },
        { refreshToken: refreshToken, lastLogin: new Date() }
    );

    res.cookie('jwt', refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({ accessToken });
}

export default handleLogin;