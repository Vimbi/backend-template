import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { DataSource } from 'typeorm';
import { ValidationArguments } from 'class-validator/types/validation/ValidationArguments';
import { BadRequestException } from '@nestjs/common';
import { Role } from '../resources/roles/entities/role.entity';
import { ALLOWED_ROLES } from '../common/constants/common-constants';

@ValidatorConstraint({ name: 'IsRoleAvailable', async: true })
export class IsRoleAvailable implements ValidatorConstraintInterface {
  constructor(private dataSource: DataSource) {}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async validate(value: string, _validationArguments: ValidationArguments) {
    if (!value) {
      throw new BadRequestException(`Role id should not be null or undefined`);
    }
    const role = await this.dataSource.getRepository(Role).findOneByOrFail({
      id: value,
    });

    return ALLOWED_ROLES.includes(role.name);
  }
}
