import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { Country } from './entities/country.entity';
import { CountryDto } from './dto/country.dto';
import { errorMsgs } from '../../shared/error-messages';

@Injectable()
export class CountriesService {
  constructor(
    @InjectRepository(Country)
    private repository: Repository<Country>,
  ) {}

  /**
   * Create new Country
   * @param dto data to create Country
   * @returns created Country
   */

  public async create(dto: CountryDto) {
    const insertResult = await this.repository.insert(dto);
    return await this.repository.findOneBy({
      id: insertResult.identifiers[0].id,
    });
  }

  /**
   * Returns all Countries
   * @returns array of Countries
   */

  public async find() {
    return await this.repository.find();
  }

  /**
   * Returns Country by find options
   * @param findOptions find options
   * @returns Country
   * @throws NotFoundException if Country not found
   */

  async findOneOrFail(
    findOptions: FindOptionsWhere<Country> | FindOptionsWhere<Country>[],
  ) {
    const result = await this.repository.findOneBy(findOptions);
    if (!result) throw new NotFoundException(errorMsgs.countryNotExist);
    return result;
  }

  /**
   * Updates Country by id
   * @param id Country id
   * @param dto data to update Country
   * @returns updated Country
   * @throws NotFoundException if Country not found
   */

  async update(id: string, dto: CountryDto) {
    await this.findOneOrFail({ id });
    await this.repository.update(id, dto);
    return await this.repository.findOneBy({ id });
  }

  /**
   * Removes Country by id
   * @param id Country id
   * @returns void
   * @throws NotFoundException if Country not found
   */

  async delete(id: string) {
    await this.findOneOrFail({ id });
    await this.repository.delete(id);
  }
}
