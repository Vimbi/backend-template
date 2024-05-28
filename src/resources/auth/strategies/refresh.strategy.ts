import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { errorMsgs } from '../../../shared/error-messages';
import { UsersService } from '../../users/services/users.service';
import { IJwtPayload } from '../../../types/auth/jwt-payload.interface';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    private configService: ConfigService,
    private userService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('auth.secretRefreshToken'),
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: IJwtPayload) {
    const refreshToken = req.cookies?.refresh;
    if (!refreshToken) throw new ForbiddenException('Refresh token malformed');

    const user = await this.userService
      .getRepository()
      .findOne({ where: { id: payload.id }, relations: { account: true } });

    if (!user) {
      throw new NotFoundException(errorMsgs.userNotFound);
    }
    if (user.deletedAt) {
      throw new UnauthorizedException(errorMsgs.userDeleted);
    }
    if (user.account.bannedAt) {
      throw new ForbiddenException(errorMsgs.userBanned);
    }

    return {
      ...payload,
      refreshToken,
    };
  }
}
