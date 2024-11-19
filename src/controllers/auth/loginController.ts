import User from '@/models/User';
import { Request, Response } from 'express';
import genAccessToken from '../generators/accessTokenGen';
import genRefreshToken from '../generators/refreshTokenGen';
import { getRolesFromUserId } from '@/utils/roles';

const handleLogin = async (req: Request, res: Response) => {
    const { email, password } = req.body as { email: string, password: string };
    if(!email || !password) { res.status(400).send("Identifiant et/ou mot de passe manquant(s)."); return; }

    const user = await User.findOne({ email: email });
    if(!user || !user.password) { res.status(401).send("Identifiant et/ou mot de passe incorrect(s)."); return; }

    const valid = password == user.password; /*await bcrypt.compare(password, user.password);*/
    if(!valid) { res.status(401).send("Identifiant et/ou mot de passe incorrect(s)."); return; }

    const userRoles = await getRolesFromUserId(user.id);

    const accessToken = genAccessToken({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        roles: userRoles
    });

    const refreshToken = genRefreshToken({
        id: user.id
    });

    await User.findOneAndUpdate(
        { email: email },
        { refreshToken: refreshToken, lastLogin: new Date() }
    );

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({ accessToken });
}

export default handleLogin;