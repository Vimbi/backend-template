import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, Repository } from 'typeorm';
import { errorMsgs } from '../../shared/error-messages';
import { CronJob } from 'cron';
import { SchedulerRegistry } from '@nestjs/schedule';
import { hoursToMilliseconds } from '../../utils/cast.helper';
import { UserConfirmationHash } from './entities/user-confirmation-hash.entity';
import { createErrorMessage } from '../../utils/create-error-message';
import * as moment from 'moment';

@Injectable()
export class UserConfirmationHashesDeleteExpiredCronJob {
  private readonly _logger = new Logger(
    UserConfirmationHashesDeleteExpiredCronJob.name,
  );
  private _cronTime: string;
  private _lifeSpan: number;
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(UserConfirmationHash)
    private readonly repository: Repository<UserConfirmationHash>,
    private readonly schedulerRegistry: SchedulerRegistry,
  ) {
    this._cronTime = this.configService.get(
      'userConfirmationHash.cronDeleteExpired',
    );
    this._lifeSpan = hoursToMilliseconds(
      this.configService.get('userConfirmationHash.lifespan'),
    );
  }

  async onModuleInit() {
    if (this._cronTime) {
      const job = new CronJob(
        this._cronTime,
        async () => await this._deleteExpired(),
      );
      this.schedulerRegistry.addCronJob(
        `${UserConfirmationHashesDeleteExpiredCronJob.name}.${this._deleteExpired.name}`,
        job,
      );
      job.start();
    }
  }

  /**
   * Soft delete expired hashes
   */

  private async _deleteExpired() {
    try {
      if (this._lifeSpan) {
        const hashes = await this.repository.findBy({
          createdAt: LessThan(
            moment().subtract(this._lifeSpan, 'minutes').toDate(),
          ),
        });
        if (hashes.length) {
          for (const hash of hashes) {
            try {
              await this.repository.softDelete({ id: hash.id });
            } catch (error) {
              this._logger.error(
                createErrorMessage({
                  error,
                  customMessage: errorMsgs.userConfirmationHashDeletion(
                    hash.id,
                  ),
                }),
              );
            }
          }
        }
      }
    } catch (error) {
      this._logger.error(
        createErrorMessage({
          error,
          customMessage: errorMsgs.userConfirmationHashesDeletionCron,
        }),
      );
    }
  }
}
