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
import { RoleDto } from './dto/role.dto';
import { RolesService } from './roles.service';
import { RolesGuard } from '../auth/guards/roles.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(RoleEnum.superAdmin)
@ApiTags('Roles')
@Controller({
  path: 'roles',
  version: '1',
})
export class RolesController {
  constructor(private readonly service: RolesService) {}

  @Post()
  async create(@Body() dto: RoleDto) {
    return await this.service.create(dto);
  }

  @Get()
  async find() {
    return await this.service.find();
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: RoleDto) {
    return await this.service.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.service.delete(id);
  }
}
