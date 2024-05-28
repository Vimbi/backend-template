import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import appConfig from './config/app.config';
import authConfig from './config/auth.config';
import fileConfig from './config/file.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './database/typeorm-config.service';
import databaseConfig from './config/database.config';
import { UserStatusesModule } from './resources/user-statuses/user-statuses.module';
import { RolesModule } from './resources/roles/roles.module';
import { UserAccountsModule } from './resources/user-accounts/user-accounts.module';
import { OrganizationTypesModule } from './resources/organization-types/organization-types.module';
import { IsNotExist } from './validation/is-not-exists.validator';
import { IsExist } from './validation/is-exists.validator';
import { CountriesModule } from './resources/countries/countries.module';
import mailConfig from './config/mail.config';
import { UsersModule } from './resources/users/users.module';
import { UserConfirmationHashesModule } from './resources/user-confirmation-hashes/user-confirmation-hashes.module';
import userConfirmationHashConfig from './config/user-confirmation-hash.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [
        appConfig,
        authConfig,
        databaseConfig,
        fileConfig,
        mailConfig,
        userConfirmationHashConfig,
      ],
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    CountriesModule,
    OrganizationTypesModule,
    RolesModule,
    UserAccountsModule,
    UserConfirmationHashesModule,
    UsersModule,
    UserStatusesModule,
  ],
  controllers: [],
  providers: [IsNotExist, IsExist, Logger],
})
export class AppModule {}
