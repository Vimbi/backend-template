import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { UserStatusDto } from './dto/user.status.dto';
import { UserStatus } from './entities/user-status.entity';
import { errorMsgs } from '../../shared/error-messages';

@Injectable()
export class UserStatusesService {
  constructor(
    @InjectRepository(UserStatus)
    private repository: Repository<UserStatus>,
  ) {}

  /**
   * Create new User Status
   * @param statusDto data to create User Status
   * @returns created User Status
   */

  public async create(dto: UserStatusDto) {
    const insertResult = await this.repository.insert(dto);
    return await this.repository.findOneBy({
      id: insertResult.identifiers[0].id,
    });
  }

  /**
   * Returns User Statuses
   * @returns array of User Statuses
   */

  public async find() {
    return await this.repository.find();
  }

  /**
   * Returns User Status by find options
   * @param findOptions find options
   * @returns User Status
   * @throws NotFoundException if User Status not found
   */

  public async findOneByOrFail(
    findOptions: FindOptionsWhere<UserStatus> | FindOptionsWhere<UserStatus>[],
  ) {
    const result = await this.repository.findOneBy(findOptions);
    if (!result) throw new NotFoundException(errorMsgs.userStatusNotExist);
    return result;
  }

  /**
   * Updates User Status by id
   * @param id User Status id
   * @param dto data to update User Status
   * @returns updated User Status
   * @throws NotFoundException if User Status not found
   */

  public async update(id: string, dto: UserStatusDto) {
    await this.findOneByOrFail({ id });
    await this.repository.update(id, dto);
    return await this.repository.findOneBy({ id });
  }

  /**
   * Removes User Status by id
   * @param id User Status id
   * @returns void
   * @throws NotFoundException if User Status not found
   */

  public async delete(id: string) {
    await this.findOneByOrFail({ id });
    await this.repository.delete(id);
  }
}
