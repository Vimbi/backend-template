import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { EntityHelper } from '../../../utils/entity-helper';
import { User } from '../../users/entities/user.entity';

@Entity('user_account')
export class UserAccount extends EntityHelper {
  @PrimaryColumn({ type: 'uuid', nullable: false, unique: true })
  userId: string;

  @OneToOne(() => User, (user) => user.account)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ type: 'boolean', nullable: false, default: false })
  isForeigner: boolean;

  @Column({ type: 'timestamp with time zone', nullable: true })
  bannedAt: Date;

  // TODO сделать историю блокировки пользователя
}
