import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "../user.entity";
import { JwtPayload } from "./jwt-payload.interface";
import { Repository } from "typeorm";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(User)
        private usersRepositry: Repository<User>
    ) {
        super({
            secretOrKey: 'TopSecret51',
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        })
    }

    async validate(payload: JwtPayload): Promise<User> {
        const { email } = payload;

        const user: User = await this.usersRepositry.findOne({
            where: {email}
        })

        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }

}