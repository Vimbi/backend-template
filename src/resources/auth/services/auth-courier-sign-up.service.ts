import { DataSource } from 'typeorm';
import { RoleEnum } from '../../roles/roles.enum';
import { AuthCourierSignUpDto } from '../dto/auth-courier-sign-up.dto';
import { createErrorMessage } from '../../../utils/create-error-message';
import { InternalServerErrorException, Logger } from '@nestjs/common';
import { errorMsgs } from '../../../shared/error-messages';
import { UserCreationService } from '../../users/services/user.creation.service';

export class AuthCourierSignUpService {
  private readonly _logger = new Logger(AuthCourierSignUpService.name);
  constructor(
    private readonly dataSource: DataSource,
    private readonly userCreationService: UserCreationService,
  ) {}

  /**
   * Create a courier
   * @param dto data to create courier
   * @returns result
   */

  public async signUp(dto: AuthCourierSignUpDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await this.userCreationService.create(queryRunner.manager, {
        ...dto,
        roleName: RoleEnum.courier,
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
