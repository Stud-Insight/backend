import User from '@/models/User';
import { Request, Response } from 'express';
import genAccessToken from '../generators/accessTokenGen';
import genRefreshToken from '../generators/refreshTokenGen';
import { getRolesFromUserId } from '@/utils/roles';
import ResponseWrapper from '@/classes/ResponseWrapper';
import bcrypt from 'bcrypt';
import ms from 'ms';
import config from 'config';

const handleLogin = async (req: Request, res: Response) => {
    const responseWrapper = new ResponseWrapper(res);
    const { email, password } = req.body as { email: string; password: string };
    if (!email || !password) {
        responseWrapper.sendError(
            400,
            'BAD_REQUEST',
            'Identifiant et/ou mot de passe manquant(s).'
        );
        return;
    }

    const user = await User.findOne({ email: email });
    if (!user || !user.password) {
        responseWrapper.sendError(
            401,
            'INVALID_CREDENTIALS',
            'Identifiant et/ou mot de passe incorrect(s).'
        );
        return;
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
        responseWrapper.sendError(
            401,
            'INVALID_CREDENTIALS',
            'Identifiant et/ou mot de passe incorrect(s).'
        );
        return;
    }

    const userRoles = await getRolesFromUserId(user.id);

    const accessToken = genAccessToken({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        roles: userRoles,
    });

    const { refreshToken, jti } = genRefreshToken({
        userId: user.id,
    });

    await User.findOneAndUpdate(
        { email: email },
        { refreshToken: jti, lastLogin: new Date() }
    );

    const accessTokenMaxAge = parseInt(ms(config.get('server.tokens.access.duration'))) / 1000;
    const refreshTokenMaxAge = parseInt(ms(config.get('server.tokens.refresh.duration'))) / 1000;

    res.json({
        access: { token: accessToken, maxAge: accessTokenMaxAge },
        refresh: { token: refreshToken, maxAge: refreshTokenMaxAge },
    });
};

export default handleLogin;
