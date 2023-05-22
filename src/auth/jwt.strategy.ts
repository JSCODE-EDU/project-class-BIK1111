import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "./user.entity";
import { UserRepository } from "./user.repository";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor( private userRepository : UserRepository ) {
        super({
            secretOrKey : 'thisissecret',
            jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken()
        });
    }

    async validate(payload) {

        const { userId } = payload;
        const user = await this.userRepository.findOne({ where: { id : userId } });

        if(!user) {
            throw new UnauthorizedException();
        }

        return user;

    }
}