import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { mailSubjects } from './mail-subjects';

@Injectable()
export class MailService {
  private readonly _appName: string;
  private readonly _backendDomain: string;
  private readonly _frontendDomain: string;
  private readonly _logoUrl: string;
  private readonly _logger = new Logger(MailService.name);
  constructor(
    private configService: ConfigService,
    private mailerService: MailerService,
  ) {
    this._backendDomain = this.configService.get('app.backendDomain');
    this._frontendDomain = this.configService.get('app.frontendDomain');
    this._logoUrl = `${this._backendDomain}/static/${this.configService.get(
      'mail.logoFileName',
    )}`;
    this._appName = this.configService.get('app.name');
  }

  /**
   * Send an email to the user with a link to confirm the email
   * @param mailData
   */

  public async employeeSignUp({ email, hash }) {
    await this.mailerService.sendMail({
      to: email,
      subject: `[${this._appName}] ${mailSubjects.employeeRegistration}`,
      text: `${this._frontendDomain}/auth/pass/create/${hash} ${mailSubjects.employeeRegistration}`,
      template: './employee-registration',
      context: {
        logoUrl: this._logoUrl,
        url: `${this._backendDomain}/auth/email/confirm/${hash}`,
      },
    });
  }
}
