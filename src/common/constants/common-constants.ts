import { RoleEnum } from '../../resources/roles/roles.enum';

export const DEVELOPMENT = 'development';
export const PRODUCTION = 'production';
export const CODE_LENGTH = 6;
export const SHORT_LENGTH = 100;
export const AVERAGE_LENGTH = 200;
export const LONG_LENGTH = 1000;
export const LARGE_LENGTH = 10000;
export const FILES_NUMBER_LIMIT = 20;

export const PASSWORD_REGEX =
  /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}/;

export const DEFAULT_PAGE_MAX_LIMIT = 50;
export const DEFAULT_PAGE_LIMIT = 10;
export const DEFAULT_PAGE = 1;

export const ALLOWED_ROLES = [RoleEnum.user];
