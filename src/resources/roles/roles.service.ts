import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { RoleDto } from './dto/role.dto';
import { Role } from './entities/role.entity';
import { errorMsgs } from '../../shared/error-messages';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private repository: Repository<Role>,
  ) {}

  /**
   * Create new Role
   * @param dto data to create Role
   * @returns created Role
   */

  async create(dto: RoleDto) {
    const insertResult = await this.repository.insert(dto);
    return await this.repository.findOneBy({
      id: insertResult.identifiers[0].id,
    });
  }

  /**
   * Returns Roles
   * @returns array of Roles
   */

  public async find() {
    return await this.repository.find();
  }

  /**
   * Returns Role by find options
   * @param findOptions find options
   * @returns Role
   * @throws NotFoundException if Role not found
   */

  public async findOneByOrFail(
    findOptions: FindOptionsWhere<Role> | FindOptionsWhere<Role>[],
  ) {
    const result = await this.repository.findOneBy(findOptions);
    if (!result) throw new NotFoundException(errorMsgs.roleNotExist);
    return result;
  }

  /**
   * Updates Role by id
   * @param id Role id
   * @param dto data to update Role
   * @returns updated Role
   * @throws NotFoundException if Role not found
   */

  public async update(id: string, dto: RoleDto) {
    await this.findOneByOrFail({ id });
    await this.repository.update(id, dto);
    return await this.repository.findOneBy({ id });
  }

  /**
   * Removes Role by id
   * @param id Role id
   * @returns void
   * @throws NotFoundException if Role not found
   */

  public async delete(id: string) {
    await this.findOneByOrFail({ id });
    await this.repository.delete(id);
  }
}
