import { AuthSignUpDto } from '../dto/auth-client-sign-up.dto';

export class AuthSignUpService {
  constructor() {}

  /**
   * Create user and send confirm email
   * @param data data to create User
   * @return void
   */

  async signUp(data: AuthSignUpDto) {
    const { phone } = data;

    const role = await this.rolesService.findOneBy({
      name: RoleEnum.user,
    });

    const statusInactive = await this.userStatusesService.findOneBy({
      name: UserStatusEnum.inactive,
    });
    const statusActive = await this.userStatusesService.findOneBy({
      name: UserStatusEnum.active,
    });
    const { isPhoneVerificationDisabled } =
      await this.systemSettingService.findOne();
    const status = isPhoneVerificationDisabled ? statusActive : statusInactive;

    const code = generateCode(this._smsCodeLength);

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await this.usersService.createTransaction({
        ...data,
        code,
        roleId: role.id,
        statusId: status.id,
        manager: queryRunner.manager,
      });

      if (this._nodeEnv === PRODUCTION) {
        if (!isPhoneVerificationDisabled) {
          await this.smsRuService.sendSms({
            to: phone,
            msg: commonMsgs.confirmationCode(code),
          });
        }
      }

      await queryRunner.commitTransaction();

      if (this._nodeEnv !== PRODUCTION) {
        return { code };
      }
    } catch (error) {
      await queryRunner.rollbackTransaction();
      this._logger.error(`${errorMsgs.userCreateError}
      Message: ${error.message}
      Stack: ${error.stack}`);
      throw new InternalServerErrorException(errorMsgs.userCreateError);
    } finally {
      await queryRunner.release();
    }
    return { result: true };
  }
}
