import { ExtractJwt } from 'passport-jwt';

export const customJwtExtractor = (request) => {
    let token = null;
    if (request && request.cookies) {
        token = request.cookies['jwt'];
    }
    if (!token && request.headers.authorization) {
        token = ExtractJwt.fromAuthHeaderAsBearerToken()(request);
    }
    return token;
};