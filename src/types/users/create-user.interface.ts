import { RoleEnum } from '../../resources/roles/roles.enum';

export type TCreateUser = ICreateCourier | ICreateEmployee | ICreateClient;

interface ICreateUser {
  firstName: string;
  lastName: string;
  patronymic: string;
  hash?: string;
  isForeigner: boolean;
}

interface ICreateCourier extends ICreateUser {
  phone: string;
  password: string;
  countryId: string;
  birthDate: Date;
  roleName: RoleEnum.courier;
}

interface ICreateEmployee extends ICreateUser {
  email: string;
  roleName: RoleEnum.employee;
}

interface ICreateClient extends ICreateUser {
  email: string;
  phone: string;
  roleName: RoleEnum.client;
}
