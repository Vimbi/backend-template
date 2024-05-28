import { MoreThanOrEqual } from 'typeorm';
import { UserConfirmationHashesService } from '../../user-confirmation-hashes/user-confirmation-hashes.service';
import { AuthEmployeeConfirmDto } from '../dto/auth-employee-confirm.dto';
import * as moment from 'moment';
import { ConfigService } from '@nestjs/config';
import { UnprocessableEntityException } from '@nestjs/common';
import { errorMsgs } from '../../../shared/error-messages';
import { UserStatusesService } from '../../user-statuses/user-statuses.service';
import { UserStatusEnum } from '../../user-statuses/user-status.enum';
import { encryptPassword } from '../../../utils/encrypt-password';
import { UsersService } from '../../users/services/users.service';

export class AuthEmployeeConfirmService {
  private readonly _hashLifespan: number;
  constructor(
    private readonly configService: ConfigService,
    private readonly userConfirmationHashesService: UserConfirmationHashesService,
    private readonly userStatusesService: UserStatusesService,
    private readonly usersService: UsersService,
  ) {
    this._hashLifespan = this.configService.get(
      'userConfirmationHash.lifespan',
    );
  }

  /**
   * Save new password
   * @param data data for reset password
   */

  public async confirm({ hash, password }: AuthEmployeeConfirmDto) {
    const userConfirmationHash =
      await this.userConfirmationHashesService.findOneBy({
        hash,
        createdAt: MoreThanOrEqual(
          moment().subtract(this._hashLifespan, 'minutes').toDate(),
        ),
      });

    if (!userConfirmationHash) {
      throw new UnprocessableEntityException(errorMsgs.hashNotValid);
    }

    const statusRole = await this.userStatusesService.findOneByOrFail({
      name: UserStatusEnum.active,
    });

    await this.usersService.getRepository().update(
      { id: userConfirmationHash.userId },
      {
        status: statusRole,
        password: await encryptPassword(password),
      },
    );
    await this.userConfirmationHashesService.softDelete(
      userConfirmationHash.id,
    );
    return { result: true };
  }
}
