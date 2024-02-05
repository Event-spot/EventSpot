import {Injectable} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import {ExtractJwt, Strategy} from 'passport-jwt';
import {Request} from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([(req: Request) => {
                let data = req?.cookies['jwt'];
                if(!data) {
                    return null;
                }
                return data;
            }]),
            ignoreExpiration: false,
            secretOrKey: 'abc'
        });
    }

    async validate(payload: any) {
        return {userId: payload.sub, email: payload.email};
    }
}