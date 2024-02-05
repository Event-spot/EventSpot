import * as bcrpyt from 'bcrypt';

export async function encodePassword(rawPassword: string) {
    const SALT = bcrpyt.genSaltSync();
    return bcrpyt.hashSync(rawPassword, SALT);
}

export async function comparePasswords(password: string, hash: string) {
    return bcrpyt.compareSync(password, hash);
}