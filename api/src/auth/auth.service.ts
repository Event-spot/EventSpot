import {Injectable} from "@nestjs/common";
import {UsersService} from "../users/users.service";
import {comparePasswords} from "../utils/bcrypt";
import {Users} from "../users/entities/users.entity";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthService {

    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) {
    }

    async validate(email: string, password: string) {
        const user = await this.usersService.findUserByEmail(email);

        const matched = await comparePasswords(password, user.password);

        if (user && matched) {
            const {password, ...result} = user;
            return result;
        }
        return null;
    }

    async login(user: any) {
        const foundedUser: Users = await this.usersService.findUserByEmail(user.email);
        const {password, ...result} = foundedUser;
        const payload = {email: foundedUser.email, sub: foundedUser.id, firstname: foundedUser.firstname};

        return {
            access_token: this.jwtService.sign(payload),
            user: {
                id: result.id,
                firstName: result.firstname,
                lastName: result.lastname,
                avatarImage: result.avatarImage
            },
        }
    }

    async verifyUser(user: any) {
        const foundedUser = await this.usersService.findUserById(user.userId);
        const {password, ...result} = foundedUser;
        return {
            user: {
                id: result.id,
                firstName: result.firstname,
                lastName: result.lastname,
                avatarImage: result.avatarImage,
            }
        }
    }
}