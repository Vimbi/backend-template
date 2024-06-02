import { DataSource } from 'typeorm';
import { RoleEnum } from '../../roles/roles.enum';
import { createErrorMessage } from '../../../utils/create-error-message';
import { InternalServerErrorException, Logger } from '@nestjs/common';
import { errorMsgs } from '../../../shared/error-messages';
import { UserCreationService } from '../../users/services/user.creation.service';
import { AuthClientSignUpDto } from '../dto/auth-client-sign-up.dto';

export class AuthClientSignUpService {
  private readonly _logger = new Logger(AuthClientSignUpService.name);
  constructor(
    private readonly dataSource: DataSource,
    private readonly userCreationService: UserCreationService,
  ) {}

  /**
   * Create a client
   * @param dto data to create courier
   * @returns result
   */

  public async signUp(dto: AuthClientSignUpDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await this.userCreationService.create(queryRunner.manager, {
        ...dto,
        roleName: RoleEnum.client,
        isForeigner: false,
      });
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      this._logger.error(
        createErrorMessage({ error, customMessage: errorMsgs.courierCreation }),
      );
      throw new InternalServerErrorException(errorMsgs.courierCreation);
    } finally {
      await queryRunner.release();
    }
    return { result: true };
  }
}
