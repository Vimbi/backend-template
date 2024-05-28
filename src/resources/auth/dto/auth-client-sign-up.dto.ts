import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  NotContains,
  Validate,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { errorMsgs } from '../../../shared/error-messages';
import { IsNotExist } from '../../../validation/is-not-exists.validator';
import { User } from '../../users/entities/user.entity';
import {
  LONG_LENGTH,
  SHORT_LENGTH,
} from '../../../common/constants/common-constants';
import { parseMobileNumber } from '../../../utils/cast.helper';
import { AuthSignUpDto } from './auth-sign-up.dto';
import { IsExist } from '../../../validation/is-exists.validator';
import { OrganizationType } from '../../organization-types/entities/organization-type.entity';

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

  @ApiProperty()
  @Validate(IsExist, [OrganizationType, 'id'], {
    message: `organizationTypeId:${errorMsgs.organizationTypeNotExist}`,
  })
  organizationTypeId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(LONG_LENGTH, {
    message: `organizationName:${errorMsgs.maxLengthField} ${LONG_LENGTH}`,
  })
  organizationName: string;
}
