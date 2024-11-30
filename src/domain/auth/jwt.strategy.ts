import { ForbiddenException, Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserHttpService } from '../user/user.http';
import { UserRepository } from '../user/user.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private _userRepo: UserRepository,
    private readonly _userHttpSrv: UserHttpService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'asdfasd',
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: TUserPayload) {
    try {
      const { authorization: accessToken } = req.headers;
      return await this._userHttpSrv.getOne(
        payload._id,
        accessToken?.split(' ')[0] ?? '',
      );
    } catch (error) {
      console.error(error);

      Logger.error(error, JwtStrategy.name);

      throw new ForbiddenException();
    }
  }
}

type TUserPayload = {
  _id: string;
  email: string;
  username: string;
  isEmailVerify: boolean;
  iat: number;
  exp: number;
};
