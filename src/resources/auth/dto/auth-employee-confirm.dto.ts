import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Matches, MaxLength, NotContains } from 'class-validator';
import { errorMsgs } from '../../../shared/error-messages';
import {
  PASSWORD_REGEX,
  SHORT_LENGTH,
} from '../../../common/constants/common-constants';

export class AuthEmployeeConfirmDto {
  @ApiProperty()
  @Matches(PASSWORD_REGEX, {
    message: `password:${errorMsgs.passwordMustMatch}`,
  })
  @NotContains(' ', { message: `password:${errorMsgs.noWhiteSpaces}` })
  @MaxLength(SHORT_LENGTH, {
    message: `password:${errorMsgs.maxLengthField} ${SHORT_LENGTH}`,
  })
  @IsNotEmpty({ message: `password:${errorMsgs.notEmptyField}` })
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  hash: string;
}
