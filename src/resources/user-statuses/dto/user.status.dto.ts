import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, NotContains } from 'class-validator';
import { SHORT_LENGTH } from '../../../common/constants/common-constants';
import { UserStatusEnum } from '../user-status.enum';

export class UserStatusDto {
  @ApiProperty()
  @IsString()
  @MaxLength(SHORT_LENGTH)
  @IsNotEmpty()
  @NotContains(' ')
  name: UserStatusEnum;

  @ApiProperty()
  @IsString()
  @MaxLength(SHORT_LENGTH)
  @IsNotEmpty()
  displayName: string;
}
