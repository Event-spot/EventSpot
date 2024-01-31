import {Controller, Post, Req, UseGuards} from "@nestjs/common";
import {LocalAuthGuard} from "./guards/local-auth.guard";
import {Request} from 'express'
import {AuthService} from "./auth.service";

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {
    }

    @Post('login')
    @UseGuards(LocalAuthGuard)
    login(@Req() request: Request) {
        return this.authService.login(request.user)
    }

}