import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { ValidationArguments } from 'class-validator/types/validation/ValidationArguments';
import { BadRequestException } from '@nestjs/common';
import * as moment from 'moment';
import { ConfigService } from '@nestjs/config';

@ValidatorConstraint({ name: 'IsAdult', async: false })
export class IsAdult implements ValidatorConstraintInterface {
  private readonly _majorityAge: number;
  constructor(private readonly configService: ConfigService) {
    this._majorityAge = this.configService.get('auth.majorityAge');
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  validate(value: Date, _validationArguments: ValidationArguments) {
    if (!value) {
      throw new BadRequestException(
        `Birth date should not be null or undefined`,
      );
    }
    const isValidDate = moment(value).isValid();
    if (isValidDate) {
      return moment(value)
        .startOf('day')
        .add(this._majorityAge, 'years')
        .isBefore();
    }

    return false;
  }
}
