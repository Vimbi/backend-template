import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import {
  AVERAGE_LENGTH,
  SHORT_LENGTH,
} from '../../../common/constants/common-constants';

export class OrganizationTypeDto {
  @ApiProperty()
  @IsString()
  @MaxLength(SHORT_LENGTH)
  @IsNotEmpty()
  displayShortName: string;

  @ApiProperty()
  @IsString()
  @MaxLength(AVERAGE_LENGTH)
  @IsNotEmpty()
  displayFullName: string;
}
