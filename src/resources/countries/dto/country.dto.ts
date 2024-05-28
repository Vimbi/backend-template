import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { AVERAGE_LENGTH } from '../../../common/constants/common-constants';

export class CountryDto {
  @ApiProperty()
  @IsString()
  @MaxLength(AVERAGE_LENGTH)
  @IsNotEmpty()
  displayName: string;
}
