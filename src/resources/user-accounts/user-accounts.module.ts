import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAccount } from './entities/user-account.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserAccount])],
  controllers: [],
  providers: [],
  exports: [],
})
export class UserAccountsModule {}
