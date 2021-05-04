import { Injectable } from "@nestjs/common";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from "@nestjs/passport";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(){
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Authorization: Bearer TOKEN...
      secretOrKey: 'GtsD6IRQ2oqD'
    })
  }

  async validate(payload: any) {
    // Validate expiration
    return payload;
  }

}