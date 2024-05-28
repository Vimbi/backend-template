import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { EntityHelper } from '../../../utils/entity-helper';
import { ApiProperty } from '@nestjs/swagger';
import { SHORT_LENGTH } from '../../../common/constants/common-constants';

@Entity('country')
export class Country extends EntityHelper {
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
  displayName: string;
}
