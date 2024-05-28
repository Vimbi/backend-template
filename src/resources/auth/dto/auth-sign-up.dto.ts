import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  NotContains,
} from 'class-validator';
import { errorMsgs } from '../../../shared/error-messages';
import {
  PASSWORD_REGEX,
  SHORT_LENGTH,
} from '../../../common/constants/common-constants';

export class AuthSignUpDto {
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
}
