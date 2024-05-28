import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { EntityHelper } from '../../../utils/entity-helper';
import { SHORT_LENGTH } from '../../../common/constants/common-constants';
import { RoleEnum } from '../roles.enum';

@Entity()
export class Role extends EntityHelper {
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
  name: RoleEnum;

  @ApiProperty()
  @Column({
    type: 'character varying',
    nullable: false,
    length: SHORT_LENGTH,
    unique: true,
  })
  displayName: string;
}
