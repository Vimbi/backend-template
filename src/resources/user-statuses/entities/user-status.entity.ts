import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { EntityHelper } from 'src/utils/entity-helper';
import { SHORT_LENGTH } from '../../../common/constants/common-constants';
import { UserStatusEnum } from '../user-status.enum';

@Entity('userStatus')
export class UserStatus extends EntityHelper {
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
  name: UserStatusEnum;

  @ApiProperty()
  @Column({
    type: 'character varying',
    nullable: false,
    length: SHORT_LENGTH,
    unique: true,
  })
  displayName: string;
}
