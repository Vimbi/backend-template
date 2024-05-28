import { Injectable } from '@nestjs/common';
import { ICreateUser } from '../../../types/users/create-user.interface';
import { Role } from '../../roles/entities/role.entity';
import { RoleEnum } from '../../roles/roles.enum';
import { UserStatus } from '../../user-statuses/entities/user-status.entity';
import { UserStatusEnum } from '../../user-statuses/user-status.enum';
import { User } from '../entities/user.entity';
import { UserAccount } from '../../user-accounts/entities/user-account.entity';
import { EntityManager } from 'typeorm';
import { UserConfirmationHash } from '../../user-confirmation-hashes/entities/user-confirmation-hash.entity';

@Injectable()
export class UserCreationService {
  /**
   * Create user, user account, user confirmation hash
   * @param data data to create
   * @returns created user
   */

  public async create(manager: EntityManager, data: ICreateUser) {
    const { hash, ...restData } = data;
    if (!data.role) {
      data.role = await manager.findOneOrFail(Role, {
        where: { name: RoleEnum.employee },
      });
    }
    if (!data.status) {
      data.status = await manager.findOneOrFail(UserStatus, {
        where: { name: UserStatusEnum.inactive },
      });
    }
    const user = await manager.save(User, restData);

    const promises = [manager.insert(UserAccount, { userId: user.id })];

    if (hash) {
      promises.push(
        manager.insert(UserConfirmationHash, { userId: user.id, hash }),
      );
    }
    await Promise.all(promises);
    return user;
  }
}
