import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthEmployeeConfirmDto } from './dto/auth-employee-confirm.dto';
import { AuthEmployeeConfirmService } from './services/auth-employee-confirm.service';
import { responseResult } from '../../utils/swagger-schemas/response-result';
import { AuthCourierSignUpService } from './services/auth-courier-sign-up.service';
import { AuthCourierSignUpDto } from './dto/auth-courier-sign-up.dto';
import { AuthClientSignUpService } from './services/auth-client-sign-up.service';
import { AuthClientSignUpDto } from './dto/auth-client-sign-up.dto';

@ApiTags('Auth')
@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(
    private readonly authClientSignUpService: AuthClientSignUpService,
    private readonly authCourierSignUpService: AuthCourierSignUpService,
    private readonly authEmployeeConfirmService: AuthEmployeeConfirmService,
  ) {}

  @Post('client/sign-up')
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse(responseResult())
  public async clientSignUp(@Body() dto: AuthClientSignUpDto) {
    return this.authClientSignUpService.signUp(dto);
  }

  @Post('courier/sign-up')
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse(responseResult())
  public async courierSignUp(@Body() dto: AuthCourierSignUpDto) {
    return this.authCourierSignUpService.signUp(dto);
  }

  @Post('employee/confirm-registration')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse(responseResult())
  public async employeeConfirm(@Body() dto: AuthEmployeeConfirmDto) {
    return this.authEmployeeConfirmService.confirm(dto);
  }
}
