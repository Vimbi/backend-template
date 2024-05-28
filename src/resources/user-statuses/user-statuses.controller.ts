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
import { UserStatusDto } from './dto/user.status.dto';
import { UserStatusesService } from './user-statuses.service';
import { Roles } from '../roles/roles.decorator';
import { RoleEnum } from '../roles/roles.enum';
import { RolesGuard } from '../auth/guards/roles.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiBearerAuth()
@Roles(RoleEnum.superAdmin)
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('User status')
@Controller({
  path: 'user-statuses',
  version: '1',
})
export class UserStatusesController {
  constructor(private readonly service: UserStatusesService) {}

  @Post()
  async create(@Body() dto: UserStatusDto) {
    return await this.service.create(dto);
  }

  @Get()
  async find() {
    return await this.service.find();
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UserStatusDto) {
    return await this.service.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.service.delete(id);
  }
}
