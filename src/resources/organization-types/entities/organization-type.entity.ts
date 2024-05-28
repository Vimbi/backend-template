import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { EntityHelper } from '../../../utils/entity-helper';
import { ApiProperty } from '@nestjs/swagger';
import {
  AVERAGE_LENGTH,
  SHORT_LENGTH,
} from '../../../common/constants/common-constants';

@Entity('organizationType')
export class OrganizationType extends EntityHelper {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({
    type: 'character varying',
    nullable: false,
    length: SHORT_LENGTH,
    unique: true,
  })
  displayShortName: string;

  @ApiProperty()
  @Column({
    type: 'character varying',
    nullable: false,
    length: AVERAGE_LENGTH,
    unique: true,
  })
  displayFullName: string;
}
