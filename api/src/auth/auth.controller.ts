import {Controller, Get, Post, Req, Res, UseGuards} from "@nestjs/common";
import {LocalAuthGuard} from "./guards/local-auth.guard";
import {Request, Response} from 'express'
import {AuthService} from "./auth.service";
import {JwtAuthGuard} from "./guards/jwt-auth.guard";

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {
    }

    @Post('login')
    @UseGuards(LocalAuthGuard)
    async login(@Req() request: Request, @Res() response: Response) {
        const {access_token, user} = await this.authService.login(request.user)
        response.cookie('jwt', access_token, {
            httpOnly: true,
            // Secure off for development, because it works with HTTPS
            // secure: true,
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        return response.send({user})
    }

    @Get('verify')
    @UseGuards(JwtAuthGuard)
    async verifyToken(@Req() request: Request) {
        return await this.authService.verifyUser(request.user);
    }

    @Get('logout')
    async logout(@Res() response: Response) {
        response.cookie('jwt', '', {httpOnly: true, maxAge: 0}).sendStatus(200);
    }
}