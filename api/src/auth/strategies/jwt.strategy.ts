import {Injectable} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import {ExtractJwt, Strategy} from 'passport-jwt';
import {Request} from 'express';
import {customJwtExtractor} from './CustomJwtExtractor';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: customJwtExtractor,
            ignoreExpiration: false,
            secretOrKey: 'abc'
        });
    }

    async validate(payload: any) {
        return {userId: payload.sub, email: payload.email};
    }
}