import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizationType } from './entities/organization-type.entity';
import { OrganizationTypesController } from './organization-types.controller';
import { OrganizationTypesService } from './organization-types.service';

@Module({
  imports: [TypeOrmModule.forFeature([OrganizationType])],
  controllers: [OrganizationTypesController],
  providers: [OrganizationTypesService],
  exports: [],
})
export class OrganizationTypesModule {}
