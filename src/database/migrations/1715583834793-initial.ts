import { MigrationInterface, QueryRunner } from 'typeorm';
import { Role } from '../../resources/roles/entities/role.entity';
import { RoleEnum } from '../../resources/roles/roles.enum';
import { UserStatus } from '../../resources/user-statuses/entities/user-status.entity';
import { UserStatusEnum } from '../../resources/user-statuses/user-status.enum';
import { User } from '../../resources/users/entities/user.entity';
import { encryptPassword } from '../../utils/encrypt-password';
import {
  AVERAGE_LENGTH,
  LONG_LENGTH,
  SHORT_LENGTH,
} from '../../common/constants/common-constants';

export class Initial1715583834793 implements MigrationInterface {
  name = 'initial1715583834793';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "role"
      (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "name" character varying(${SHORT_LENGTH}) NOT NULL,
        "displayName" character varying(${SHORT_LENGTH}) NOT NULL,
        CONSTRAINT "PK_role" PRIMARY KEY ("id"),
        CONSTRAINT "UQ_role_name" UNIQUE ("name"),
        CONSTRAINT "UQ_role_displayName" UNIQUE ("displayName")
        )`,
    );
    await queryRunner.query(
      `CREATE TABLE "userStatus"
      (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "name" character varying(${SHORT_LENGTH}) NOT NULL,
        "displayName" character varying(${SHORT_LENGTH}) NOT NULL,
        CONSTRAINT "PK_userStatus" PRIMARY KEY ("id"),
        CONSTRAINT "UQ_userStatus_name" UNIQUE ("name"),
        CONSTRAINT "UQ_userStatus_displayName" UNIQUE ("displayName")
      )`,
    );
    await queryRunner.query(
      `CREATE TABLE "country"
      (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "displayName" character varying(${SHORT_LENGTH}) NOT NULL,
        CONSTRAINT "PK_country" PRIMARY KEY ("id"),
        CONSTRAINT "UQ_country_displayName" UNIQUE ("displayName")
      )`,
    );
    await queryRunner.query(
      `CREATE TABLE "organizationType"
      (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "displayShortName" character varying(${SHORT_LENGTH}) NOT NULL,
        "displayFullName" character varying(${AVERAGE_LENGTH}) NOT NULL,
        CONSTRAINT "PK_organizationType" PRIMARY KEY ("id"),
        CONSTRAINT "UQ_organizationType_displayShortName" UNIQUE ("displayShortName"),
        CONSTRAINT "UQ_organizationType_displayFullName" UNIQUE ("displayFullName")
      )`,
    );

    await queryRunner.query(
      `CREATE TABLE "user"
      (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "email" character varying(${SHORT_LENGTH}),
        "emailConfirmedAt" TIMESTAMP WITH TIME ZONE,
        "phone" character varying(${SHORT_LENGTH}),
        "password" character varying(${SHORT_LENGTH}),
        "firstName" character varying(${SHORT_LENGTH}) NOT NULL,
        "lastName" character varying(${SHORT_LENGTH}) NOT NULL,
        "patronymic" character varying(${SHORT_LENGTH}) NOT NULL,
        "roleId" uuid NOT NULL,
        "statusId" uuid NOT NULL,
        "countryId" uuid,
        "refreshToken" character varying(${AVERAGE_LENGTH}),
        "hash" character varying,
        "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE,
        "deletedAt" TIMESTAMP WITH TIME ZONE,
        CONSTRAINT "PK_user" PRIMARY KEY ("id"),
        CONSTRAINT "UQ_user_email" UNIQUE ("email"),
        CONSTRAINT "UQ_user_phone" UNIQUE ("phone"),
        CONSTRAINT "FK_user_roleId" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
        CONSTRAINT "FK_user_userStatusId" FOREIGN KEY ("statusId") REFERENCES "userStatus"("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
        CONSTRAINT "FK_user_countryId" FOREIGN KEY ("countryId") REFERENCES "country"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
      )`,
    );
    await queryRunner.query(
      `CREATE TABLE "userAccount"
      (
        "userId" uuid,
        "isForeigner" boolean NOT NULL DEFAULT false,
        "bannedAt" TIMESTAMP WITH TIME ZONE,
        CONSTRAINT "PK_userAccount" PRIMARY KEY ("userId"),
        CONSTRAINT "FK_userAccount_userId" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        )`,
    );

    await queryRunner.query(
      `CREATE TABLE "userConfirmationHash"
      (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "hash" character varying,
        "userId" uuid,
        "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE,
        CONSTRAINT "PK_userConfirmationHash" PRIMARY KEY ("id"),
        CONSTRAINT "FK_userConfirmationHash_userId" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        )`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_userConfirmationHash_hash"
      ON "userConfirmationHash"("hash")`,
    );

    //TODO далее не сделано

    await queryRunner.query(
      `CREATE TABLE "file"
      (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "path" character varying(${LONG_LENGTH}) NOT NULL,
        "name" character varying(${AVERAGE_LENGTH}) NOT NULL,
        "extension" character varying(${SHORT_LENGTH}) NOT NULL,
        "key" character varying(${LONG_LENGTH}) NOT NULL,
        "theme" character varying(${SHORT_LENGTH}),
        "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        CONSTRAINT "PK_file" PRIMARY KEY ("id")
        )`,
    );
    await queryRunner.query(
      `CREATE TABLE "articleFile"
      (
        "articleId" uuid NOT NULL,
        "fileId" uuid NOT NULL,
        "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        CONSTRAINT "PK_articleFile" PRIMARY KEY ("articleId", "fileId"),
        CONSTRAINT "FK_articleFile_articleId" FOREIGN KEY ("articleId") REFERENCES "article"("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
        CONSTRAINT "FK_articleFile_fileId" FOREIGN KEY ("fileId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
        CONSTRAINT "UQ_articleFile_articleId_fileId" UNIQUE ("articleId", "fileId")
        )`,
    );
    await queryRunner.query(
      `CREATE TABLE "raffleFile"
      (
        "raffleId" uuid NOT NULL,
        "fileId" uuid NOT NULL,
        "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        CONSTRAINT "PK_raffleFile" PRIMARY KEY ("raffleId", "fileId"),
        CONSTRAINT "FK_raffleFile_raffleId" FOREIGN KEY ("raffleId") REFERENCES "raffle"("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
        CONSTRAINT "FK_raffleFile_fileId" FOREIGN KEY ("fileId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
        CONSTRAINT "UQ_raffleFile_raffleId_fileId" UNIQUE ("raffleId", "fileId")
        )`,
    );

    await queryRunner.manager.insert(Role, {
      name: RoleEnum.admin,
      displayName: 'Admin',
    });
    await queryRunner.manager.insert(Role, {
      name: RoleEnum.superAdmin,
      displayName: 'Super admin',
    });
    await queryRunner.manager.insert(Role, {
      name: RoleEnum.user,
      displayName: 'User',
    });
    await queryRunner.manager.insert(UserStatus, {
      name: UserStatusEnum.active,
      displayName: UserStatusEnum.active,
    });
    await queryRunner.manager.insert(UserStatus, {
      name: UserStatusEnum.inactive,
      displayName: UserStatusEnum.inactive,
    });

    const superAdminRole = await queryRunner.manager.findOneBy(Role, {
      name: RoleEnum.superAdmin,
    });
    const userStatusActive = await queryRunner.manager.findOneBy(UserStatus, {
      name: UserStatusEnum.active,
    });
    await queryRunner.manager.insert(User, {
      phone: '9999999999', // TODO изменить
      firstName: 'super-admin',
      lastName: 'super-admin',
      surname: 'super-admin',
      password: await encryptPassword('Ovva@2024'),
      role: superAdminRole,
      status: userStatusActive,
      referralCode: '999999999', // TODO изменить
    });

    await queryRunner.manager.insert(User, {
      phone: 'test1@example.com', // TODO изменить
      firstName: 'test',
      lastName: 'test',
      surname: 'test',
      password: await encryptPassword('32198723'),
      role: superAdminRole,
      status: userStatusActive,
      referralCode: '111111111', // TODO изменить
    });
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_user_roleId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_userStatusId"`,
    );
    await queryRunner.query(`DROP TABLE "file"`);
    await queryRunner.query(`DROP TABLE "forgot"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "product"`);
    await queryRunner.query(`DROP TABLE "userStatus"`);
    await queryRunner.query(`DROP TABLE "role"`);
  }
}
