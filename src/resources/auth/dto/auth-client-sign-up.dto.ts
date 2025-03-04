import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  MaxLength,
  NotContains,
  Validate,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { errorMsgs } from '../../../shared/error-messages';
import { IsNotExist } from '../../../validation/is-not-exists.validator';
import { User } from '../../users/entities/user.entity';
import { SHORT_LENGTH } from '../../../common/constants/common-constants';
import { parseMobileNumber } from '../../../utils/cast.helper';
import { AuthSignUpDto } from './auth-sign-up.dto';

export class AuthClientSignUpDto extends AuthSignUpDto {
  @ApiProperty({ example: 'email' })
  @Transform(({ value }) => value.toLowerCase().trim())
  @IsEmail({}, { message: `email:${errorMsgs.mustBeEmail}` })
  @NotContains(' ', { message: `email:${errorMsgs.noWhiteSpaces}` })
  @MaxLength(SHORT_LENGTH, {
    message: `email:${errorMsgs.maxLengthField} ${SHORT_LENGTH}`,
  })
  @IsNotEmpty({ message: `email:${errorMsgs.notEmptyField}` })
  @Validate(IsNotExist, [User.name, 'email'], {
    message: `email:${errorMsgs.emailExists}`,
  })
  email: string;

  @ApiProperty()
  @Transform(
    ({ value }) => {
      return parseMobileNumber(value);
    },
    {
      toClassOnly: true,
    },
  )
  @Validate(IsNotExist, [User.name, 'phone'], {
    message: `phone:${errorMsgs.phoneExists}`,
  })
  phone: string;
}
