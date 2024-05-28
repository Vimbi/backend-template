import { Logger, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { RefreshTokenStrategy } from './strategies/refresh.strategy';
import { MailModule } from '../mail/mail.module';
import { RolesModule } from '../roles/roles.module';
import { UsersModule } from '../users/users.module';
import { UserStatusesModule } from '../user-statuses/user-statuses.module';
import { AuthEmployeeConfirmService } from './services/auth-employee-confirm.service';
import { AuthCourierSignUpService } from './auth-courier-sign-up.service';

@Module({
  imports: [
    JwtModule.register({}),
    MailModule,
    PassportModule,
    // RecaptchaModule,
    RolesModule,
    UsersModule,
    UserStatusesModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthCourierSignUpService,
    AuthEmployeeConfirmService,
    JwtStrategy,
    RefreshTokenStrategy,
    Logger,
  ],
  exports: [],
})
export class AuthModule {}
