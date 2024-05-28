import * as crypto from 'crypto';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Role } from '../../roles/entities/role.entity';
import { RoleEnum } from '../../roles/roles.enum';
import { CreateEmployeeDto } from '../dto/create-employee.dto';
import { DataSource } from 'typeorm';
import { UserCreationService } from './user.creation.service';
import { MailService } from '../../mail/mail.service';
import { errorMsgs } from '../../../shared/error-messages';
import { createErrorMessage } from '../../../utils/create-error-message';

@Injectable()
export class EmployeeCreationService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly _logger = new Logger(EmployeeCreationService.name),
    private readonly mailService: MailService,
    private readonly userCreationService: UserCreationService,
  ) {}

  /**
   * Create Employee, send confirm email
   * @param dto data to create Employee
   * @return void
   */

  public async create(dto: CreateEmployeeDto) {
    const { email } = dto;

    const employeeRole = await this.dataSource
      .getRepository(Role)
      .findOneByOrFail({
        name: RoleEnum.employee,
      });

    const hash = crypto
      .createHash('sha256')
      .update(randomStringGenerator())
      .digest('hex');

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    const { manager } = queryRunner;

    try {
      await this.userCreationService.create(manager, {
        ...dto,
        hash,
        role: employeeRole,
      });

      await this.mailService.employeeSignUp({
        email,
        hash,
      });

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      this._logger.error(
        createErrorMessage({
          error,
          customMessage: errorMsgs.employeeCreationError,
        }),
      );
      throw new InternalServerErrorException(errorMsgs.employeeCreationError);
    } finally {
      await queryRunner.release();
    }
    return { result: true };
  }
}
