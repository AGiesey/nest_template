import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "../user.entity";
import { JwtPayload } from "./jwt-payload.interface";
import { Repository } from "typeorm";
import { Logger } from "@nestjs/common";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    private logger = new Logger("JwtStrategy", {timestamp: true})
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
            this.logger.debug(`User email "${email} did not validate"`);
            throw new UnauthorizedException();
        }

        return user;
    }

}