import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from '../roles/roles.decorator';
import { RoleEnum } from '../roles/roles.enum';
import { RolesGuard } from '../auth/guards/roles.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { EmployeeCreationService } from './services/employee.creation.service';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('Users')
@Controller({
  path: 'users',
  version: '1',
})
export class UsersController {
  constructor(
    private readonly employeeCreationService: EmployeeCreationService,
  ) {}

  @UseGuards(RolesGuard)
  @Roles(RoleEnum.admin)
  @Post()
  async create(@Body() dto: CreateEmployeeDto) {
    return await this.employeeCreationService.create(dto);
  }

  // @UseGuards(RolesGuard)
  // @Roles(RoleEnum.admin)
  // @ApiResponse(responsePaginationSchema(User))
  // @Get()
  // async find(@Query() dto: GetUsersDto) {
  //   return await this.usersService.find(dto);
  // }

  // @Get(':id')
  // @ApiResponse({ type: User })
  // async findOne(@GetUser('role') { name }: Role, @Param('id') id: string) {
  //   return await this.usersService.findOnePublic(name, { id });
  // }

  // @UseGuards(RolesGuard)
  // @Roles(RoleEnum.admin)
  // @ApiExcludeEndpoint()
  // @Delete('delete-many')
  // async deleteMany(@Body() dto: DeleteUsersDto) {
  //   return await this.usersService.deleteMany(dto);
  // }
}
