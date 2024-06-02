import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { errorMsgs } from '../../../shared/error-messages';
import { SHORT_LENGTH } from '../../../common/constants/common-constants';

export class AuthSignUpDto {
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
