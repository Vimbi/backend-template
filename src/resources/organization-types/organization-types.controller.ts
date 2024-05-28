import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from '../roles/roles.decorator';
import { RoleEnum } from '../roles/roles.enum';
import { RolesGuard } from '../auth/guards/roles.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { OrganizationTypesService } from './organization-types.service';
import { OrganizationTypeDto } from './dto/organization-type.dto';

@ApiTags('Organization types')
@Controller({
  path: 'organization-types',
  version: '1',
})
export class OrganizationTypesController {
  constructor(private readonly service: OrganizationTypesService) {}

  @ApiBearerAuth()
  @Roles(RoleEnum.superAdmin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async create(@Body() dto: OrganizationTypeDto) {
    return await this.service.create(dto);
  }

  @Get()
  async find() {
    return await this.service.find();
  }

  @ApiBearerAuth()
  @Roles(RoleEnum.superAdmin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: OrganizationTypeDto) {
    return await this.service.update(id, dto);
  }

  @ApiBearerAuth()
  @Roles(RoleEnum.superAdmin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.service.delete(id);
  }
}
