import { ExtractJwt, Strategy } from 'passport-jwt';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { errorMsgs } from '../../../shared/error-messages';
import { IJwtPayload } from '../../../types/auth/jwt-payload.interface';
import { UsersService } from '../../users/services/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private userService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('auth.secret'),
    });
  }

  public async validate(payload: IJwtPayload) {
    if (!payload.id) {
      throw new UnauthorizedException();
    }

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

    return payload;
  }
}
