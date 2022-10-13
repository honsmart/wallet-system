import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { type } from "os";
import { ExtractJwt, Strategy } from "passport-jwt";

type JwtPayload = {
    id: number,
   phoneNumber: number
}

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, 'jwt'){
    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'at-secret'
        })
    }

    validate(payload: JwtPayload){
      return payload
    }
}