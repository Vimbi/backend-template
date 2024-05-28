import { Role } from '../../resources/roles/entities/role.entity';
import { UserStatus } from '../../resources/user-statuses/entities/user-status.entity';

export interface ICreateUser {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  patronymic: string;
  hash?: string;
  role?: Role;
  status?: UserStatus;
}
