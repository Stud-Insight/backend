import generator from 'generate-password';


import User from '@/models/User';
import IUser from '@/interfaces/IUser';
import { addRolesFromNames } from './roles';
import Role from '@/models/Role';

const SETUP_PREFIX = '[🔧] ';

export const checkAdminExists = async () => {
    const adminRole = await Role.findOne({ name: 'ADMIN' });
    const query: IUser | null = await User.findOne({ roles: { $in: [adminRole?._id] } });
    return !!query;
}

export const createAdminUser = async () => {
    let username = process.env.ADMIN_USER;
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
        email: username + '@example.com',
        password: password,
        activationDate: new Date()
    });
    addRolesFromNames(user.id, "ADMIN");

    try {
        await user.save();
        let redactedPassword = password.slice(0, 2) + '*'.repeat(password.length - 2);
        console.info(SETUP_PREFIX + `Successfully created default admin account. (${username}, ${redactedPassword})`);
    } catch (error) {
        console.error(SETUP_PREFIX + 'An error occured when creating admin user.');
        console.error(error);
    }
};
