import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, NotContains } from 'class-validator';
import { SHORT_LENGTH } from '../../../common/constants/common-constants';
import { RoleEnum } from '../roles.enum';

export class RoleDto {
  @ApiProperty()
  @IsString()
  @MaxLength(SHORT_LENGTH)
  @IsNotEmpty()
  @NotContains(' ')
  name: RoleEnum;

  @ApiProperty()
  @IsString()
  @MaxLength(SHORT_LENGTH)
  @IsNotEmpty()
  displayName: string;
}
