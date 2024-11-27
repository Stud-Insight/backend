import User from '@/models/User';
import generator from 'generate-password';

const SETUP_PREFIX = '[Setup] ';

export const adminUserExists = () => {};

export const createAdminUser = async () => {
    let username = process.env.ADMIN_EMAIL || process.env.ADMIN_USER;
    let email = process.env.ADMIN_EMAIL;
    let password = process.env.ADMIN_PASSWORD;

    if (!username && !email) {
        username = 'admin';
        console.info(SETUP_PREFIX + 'ADMIN_EMAIL or ADMIN_USER environement variables not found.');
        console.info(SETUP_PREFIX + `Creating default username: admin`);
    }

    if (!password) {
        password = generator.generate({
            length: 12,
            numbers: true,
        });
        console.info(SETUP_PREFIX + 'ADMIN_PASSWORD environement variable not found.');
        console.info(SETUP_PREFIX + `Creating a random password: ${password}`);
    }

    const user = new User({
        firstName: username,
        lastName: undefined,
        email: email,
        password: password,
        activationDate: new Date()
    });

    try {
        await user.save();
        console.info(SETUP_PREFIX + 'Successfully created default admin account.');
    } catch (error) {
        console.error(SETUP_PREFIX + 'An error occured when creating admin user.');
        console.error(error);
    }
};
