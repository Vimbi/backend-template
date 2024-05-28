import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { toArray } from '../utils/cast.helper';
import { IPaginationOptions } from './pagination-options.interface';
import {
  DEFAULT_PAGE_LIMIT,
  DEFAULT_PAGE,
  DEFAULT_PAGE_MAX_LIMIT,
} from '../common/constants/common-constants';

export class SearchQueryDto implements IPaginationOptions {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  search?: string;

  @ApiPropertyOptional({
    type: 'array',
    items: {
      type: 'array',
      items: {
        type: 'string',
      },
    },
  })
  @Transform(({ value }) => toArray(value), {
    toClassOnly: true,
  })
  @IsArray()
  @IsOptional()
  sort?: string[][];

  @ApiPropertyOptional({ default: DEFAULT_PAGE })
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  @IsOptional()
  page: number = DEFAULT_PAGE;

  @ApiPropertyOptional({
    default: DEFAULT_PAGE_LIMIT,
    maximum: DEFAULT_PAGE_MAX_LIMIT,
  })
  @Transform(
    ({ value }) => {
      if (value > DEFAULT_PAGE_MAX_LIMIT) {
        return DEFAULT_PAGE_MAX_LIMIT;
      } else {
        return DEFAULT_PAGE_LIMIT;
      }
    },
    {
      toClassOnly: true,
    },
  )
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  @IsOptional()
  limit: number;
}
