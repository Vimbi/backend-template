import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthEmployeeConfirmDto } from './dto/auth-employee-confirm.dto';
import { AuthEmployeeConfirmService } from './services/auth-employee-confirm.service';
import { responseResult } from '../../utils/swagger-schemas/response-result';
import { AuthCourierSignUpService } from './auth-courier-sign-up.service';
import { AuthCourierSignUpDto } from './dto/auth-courier-sign-up.dto';

@ApiTags('Auth')
@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(
    private readonly authCourierSignUpService: AuthCourierSignUpService,
    public readonly authEmployeeConfirmService: AuthEmployeeConfirmService,
  ) {}

  @Post('courier/sign-up')
  public async courierSignUp(@Body() dto: AuthCourierSignUpDto) {
    return this.authCourierSignUpService.signUp(dto);
  }

  @Post('employee/confirm-registration')
  @ApiResponse(responseResult())
  public async employeeConfirm(@Body() dto: AuthEmployeeConfirmDto) {
    return this.authEmployeeConfirmService.confirm(dto);
  }
}
