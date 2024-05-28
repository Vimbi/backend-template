import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  NotContains,
  Validate,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { errorMsgs } from '../../../shared/error-messages';
import { IsNotExist } from '../../../validation/is-not-exists.validator';
import { User } from '../entities/user.entity';
import { SHORT_LENGTH } from '../../../common/constants/common-constants';
import { parseMobileNumber } from '../../../utils/cast.helper';
import { AuthSignUpDto } from '../../auth/dto/auth-sign-up.dto';

export class CreateEmployeeDto extends AuthSignUpDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: `firstName:${errorMsgs.notEmptyField}` })
  @MaxLength(SHORT_LENGTH, {
    message: `firstName:${errorMsgs.maxLengthField} ${SHORT_LENGTH}`,
  })
  firstName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: `lastName:${errorMsgs.notEmptyField}` })
  @MaxLength(SHORT_LENGTH, {
    message: `lastName:${errorMsgs.maxLengthField} ${SHORT_LENGTH}`,
  })
  lastName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: `patronymic:${errorMsgs.notEmptyField}` })
  @MaxLength(SHORT_LENGTH, {
    message: `patronymic:${errorMsgs.maxLengthField} ${SHORT_LENGTH}`,
  })
  patronymic: string;

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

  @ApiPropertyOptional()
  @Transform(
    ({ value }) => {
      if (value) {
        return parseMobileNumber(value);
      }
    },
    {
      toClassOnly: true,
    },
  )
  @Validate(IsNotExist, [User.name, 'phone'], {
    message: `phone:${errorMsgs.phoneExists}`,
  })
  @IsOptional()
  phone?: string;
}
