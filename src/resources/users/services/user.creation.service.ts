import { Injectable } from '@nestjs/common';
import { TCreateUser } from '../../../types/users/create-user.interface';
import { User } from '../entities/user.entity';
import { UserAccount } from '../../user-accounts/entities/user-account.entity';
import { EntityManager } from 'typeorm';
import { UserConfirmationHash } from '../../user-confirmation-hashes/entities/user-confirmation-hash.entity';
import { Role } from '../../roles/entities/role.entity';
import { UserStatus } from '../../user-statuses/entities/user-status.entity';
import { UserStatusEnum } from '../../user-statuses/user-status.enum';

@Injectable()
export class UserCreationService {
  /**
   * Create user, user account, user confirmation hash
   * @param data data to create
   * @returns created user
   */

  public async create(manager: EntityManager, data: TCreateUser) {
    const { hash, isForeigner, roleName, ...restData } = data;

    const role = await manager.findOneByOrFail(Role, {
      name: roleName,
    });

    const status = await manager.findOneByOrFail(UserStatus, {
      name: UserStatusEnum.inactive,
    });
    const user = await manager.save(User, { ...restData, role, status });

    const promises = [
      manager.insert(UserAccount, {
        userId: user.id,
        isForeigner,
      }),
    ];

    if (hash) {
      promises.push(
        manager.insert(UserConfirmationHash, { userId: user.id, hash }),
      );
    }
    await Promise.all(promises);
    return user;
  }
}
