import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EntityHelper } from '../../../utils/entity-helper';
import {
  AVERAGE_LENGTH,
  SHORT_LENGTH,
} from '../../../common/constants/common-constants';
import { Exclude } from 'class-transformer';
import { Role } from '../../roles/entities/role.entity';
import { UserStatus } from '../../user-statuses/entities/user-status.entity';
import { UserAccount } from '../../user-accounts/entities/user-account.entity';
import { Country } from '../../countries/entities/country.entity';

@Entity()
export class User extends EntityHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'character varying',
    nullable: true,
    length: SHORT_LENGTH,
    unique: true,
  })
  email?: string | null;

  @Column({ type: 'timestamp with time zone', nullable: true })
  emailConfirmedAt?: Date | null;

  @Column({
    type: 'character varying',
    nullable: true,
    length: SHORT_LENGTH,
    unique: true,
  })
  phone?: string | null;

  @Exclude()
  @Column({ type: 'character varying', nullable: true, length: SHORT_LENGTH })
  password?: string | null;

  @Column({ type: 'character varying', nullable: false, length: SHORT_LENGTH })
  firstName: string;

  @Column({ type: 'character varying', nullable: false, length: SHORT_LENGTH })
  lastName: string;

  @Column({ type: 'character varying', nullable: false, length: SHORT_LENGTH })
  patronymic: string;

  @Column({ type: 'uuid', nullable: false })
  roleId: string;

  @ManyToOne(() => Role)
  @JoinColumn({ name: 'roleId' })
  role: Role;

  @Column({ type: 'uuid', nullable: false })
  statusId: string;

  @ManyToOne(() => UserStatus)
  @JoinColumn({ name: 'statusId' })
  status: UserStatus;

  @Column({ type: 'uuid', nullable: true })
  countryId: string | null;

  @ManyToOne(() => Country)
  @JoinColumn({ name: 'countryId' })
  country: Country;

  @Column({ type: 'character varying', nullable: true, length: AVERAGE_LENGTH })
  refreshToken?: string | null;

  @Column({
    type: 'timestamp with time zone',
    default: () => 'now()',
    nullable: false,
  })
  createdAt: Date;

  @Column({
    type: 'timestamp with time zone',
    nullable: true,
  })
  updatedAt?: Date | null;

  @Column({
    type: 'timestamp with time zone',
    nullable: true,
  })
  deletedAt?: Date | null;

  @OneToOne(() => UserAccount, (account) => account.user)
  account: UserAccount;
}
