import {Module} from "@nestjs/common";
import {AuthService} from "./auth.service";
import {AuthController} from "./auth.controller";
import {UsersModule} from "../users/users.module";
import {LocalStrategy} from "./strategies/local.strategy";
import {JwtModule} from "@nestjs/jwt";

@Module({
    imports: [UsersModule, JwtModule.register({
        secret: 'abc',
        signOptions: {expiresIn: '60s'},
    })],
    providers: [AuthService, LocalStrategy],
    controllers: [AuthController],
    exports: [],
})
export class AuthModule {}