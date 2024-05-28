import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserConfirmationHash } from './entities/user-confirmation-hash.entity';
import { UserConfirmationHashesDeleteExpiredCronJob } from './user-confirmation-hashes-delete-expired.cron-job';
import { UserConfirmationHashesService } from './user-confirmation-hashes.service';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([UserConfirmationHash])],
  providers: [
    UserConfirmationHashesDeleteExpiredCronJob,
    UserConfirmationHashesService,
  ],
  exports: [UserConfirmationHashesService],
})
export class UserConfirmationHashesModule {}
