import generator from 'generate-password';


import User from '@/models/User';
import IUser from '@/interfaces/IUser';
import { addRoles, addRolesFromNames } from './roles';

const SETUP_PREFIX = '[Setup] ';

export const checkAdminExists = async () => {
    const query: IUser | null = await User.findOne({ firstName: 'admin' });
    return !!query;
}

export const createAdminUser = async () => {
    let username = process.env.ADMIN_USER;
    let email = process.env.ADMIN_EMAIL;
    let password = process.env.ADMIN_PASSWORD;

    if (!username) {
        username = 'admin';
        console.info(SETUP_PREFIX + 'ADMIN_USER environement variable not found. Creating default account username: admin');
    }

    if (!password) {
        password = generator.generate({
            length: 12,
            numbers: true,
        });
        console.info(SETUP_PREFIX + `ADMIN_PASSWORD environement variable not found. Creating a random password: ${password}`);
    }

    const user = new User({
        firstName: username,
        lastName: undefined,
        email: email,
        password: password,
        activationDate: new Date()
    });
    addRolesFromNames(user.id, "ADMIN");

    try {
        await user.save();
        console.info(SETUP_PREFIX + 'Successfully created default admin account.');
    } catch (error) {
        console.error(SETUP_PREFIX + 'An error occured when creating admin user.');
        console.error(error);
    }
};
