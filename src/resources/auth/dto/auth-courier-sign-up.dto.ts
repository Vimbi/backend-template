import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  Matches,
  MaxLength,
  NotContains,
  Validate,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { errorMsgs } from '../../../shared/error-messages';
import { IsNotExist } from '../../../validation/is-not-exists.validator';
import { User } from '../../users/entities/user.entity';
import { AuthSignUpDto } from './auth-sign-up.dto';
import { parseMobileNumber } from '../../../utils/cast.helper';
import { Country } from '../../countries/entities/country.entity';
import { IsAdult } from '../../../validation/is-adult.validator';
import {
  PASSWORD_REGEX,
  SHORT_LENGTH,
} from '../../../common/constants/common-constants';

export class AuthCourierSignUpDto extends AuthSignUpDto {
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
  @NotContains(' ', { message: `password:${errorMsgs.noWhiteSpaces}` })
  @MaxLength(SHORT_LENGTH, {
    message: `password:${errorMsgs.maxLengthField} ${SHORT_LENGTH}`,
  })
  @IsNotEmpty({ message: `password:${errorMsgs.notEmptyField}` })
  @Matches(PASSWORD_REGEX, {
    message: `password:${errorMsgs.passwordMustMatch}`,
  })
  password: string;

  @ApiProperty()
  @Validate(IsNotExist, [Country.name, 'id'], {
    message: `country:${errorMsgs.countryNotExist}`,
  })
  countryId: string;

  @ApiProperty()
  @IsBoolean()
  isForeigner: boolean;

  @ApiProperty()
  @Validate(IsAdult, { message: errorMsgs.adultsConstraint })
  birthDate: Date;
}
