import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { OrganizationType } from './entities/organization-type.entity';
import { OrganizationTypeDto } from './dto/organization-type.dto';
import { errorMsgs } from '../../shared/error-messages';

@Injectable()
export class OrganizationTypesService {
  constructor(
    @InjectRepository(OrganizationType)
    private repository: Repository<OrganizationType>,
  ) {}

  /**
   * Create new Organization Type
   * @param dto data to create Organization Type
   * @returns created Organization Type
   */

  public async create(dto: OrganizationTypeDto) {
    const insertResult = await this.repository.insert(dto);
    return await this.repository.findOneBy({
      id: insertResult.identifiers[0].id,
    });
  }

  /**
   * Returns Organization Types by
   * @returns array of Organization Types
   */

  public async find() {
    return await this.repository.find();
  }

  /**
   * Returns Organization Type by find options
   * @param findOptions find options
   * @returns Organization Type
   * @throws NotFoundException if Organization Type not found
   */

  async findOneOrFail(
    findOptions:
      | FindOptionsWhere<OrganizationType>
      | FindOptionsWhere<OrganizationType>[],
  ) {
    const result = await this.repository.findOneBy(findOptions);
    if (!result)
      throw new NotFoundException(errorMsgs.organizationTypeNotExist);
    return result;
  }

  /**
   * Updates Organization Type by id
   * @param id Organization Type id
   * @param dto data to update Organization Type
   * @returns updated Organization Type
   * @throws NotFoundException if Organization Type not found
   */

  async update(id: string, dto: OrganizationTypeDto) {
    await this.findOneOrFail({ id });
    await this.repository.update(id, dto);
    return await this.repository.findOneBy({ id });
  }

  /**
   * Removes Organization Type by id
   * @param id Organization Type id
   * @returns void
   * @throws NotFoundException if Organization Type not found
   */

  async delete(id: string) {
    await this.findOneOrFail({ id });
    await this.repository.delete(id);
  }
}
