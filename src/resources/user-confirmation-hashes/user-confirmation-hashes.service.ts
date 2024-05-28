import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';
import { UserConfirmationHash } from './entities/user-confirmation-hash.entity';

@Injectable()
export class UserConfirmationHashesService {
  constructor(
    @InjectRepository(UserConfirmationHash)
    private readonly repository: Repository<UserConfirmationHash>,
  ) {}

  /**
   * Returns UserConfirmationHash by find options
   * @param findOptions find options
   * @return UserConfirmationHash or undefined
   */

  public async findOneBy(
    findOptions:
      | FindOptionsWhere<UserConfirmationHash>
      | FindOptionsWhere<UserConfirmationHash>[],
  ) {
    return this.repository.findOneBy(findOptions);
  }

  /**
   * Create new UserConfirmationHash
   * @param data data to create UserConfirmationHash
   * @returns insert result
   */

  public async create(data: DeepPartial<UserConfirmationHash>) {
    return this.repository.insert(data);
  }

  /**
   * Soft delete UserConfirmationHash by id
   * @param id UserConfirmationHash id
   * @returns void
   */

  public async softDelete(id: string): Promise<void> {
    await this.repository.softDelete({ id });
  }
}
