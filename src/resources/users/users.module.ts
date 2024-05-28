import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersService } from './services/users.service';
import { UsersController } from './users.controller';
import { UserCreationService } from './services/user.creation.service';
import { EmployeeCreationService } from './services/employee.creation.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [
    EmployeeCreationService,
    UserCreationService,
    UsersService,
    Logger,
  ],
  exports: [UsersService],
})
export class UsersModule {}
