export const errorMsgs = {
  adultsConstraint: 'Регистрация возможна только для совершеннолетних',
  countryNotExist: 'Country does not exist',
  courierCreation: 'Error creating courier',
  emailExists: 'Почта уже занята',
  employeeCreationError: 'Error creating employee',
  hashNotValid: 'Хэш не валиден',
  maxLengthField: 'Максимально допустимая длина',
  mustBePhoneNumber: 'Необходимо указать валидный телефонный номер',
  mustBeEmail: 'Должен быть указан валидный адрес электронной почты',
  notEmptyField: 'Поле не должно быть пустым',
  noWhiteSpaces: 'Не должно быть пробелов',
  organizationTypeNotExist: 'Organization type does not exist',
  passwordMustMatch: `Пароль должен содержать:
  - 8 и более символов
  - прописные латинские буквы
  - строчные латинские буквы
  - цифры`,
  phoneExists: 'Пользователь с данным номером телефона уже существует',
  roleNotAvailable: 'Роль не доступна для назначения',
  roleNameExists: 'Role name already exists',
  roleNotExist: 'Role does not exist',
  roleDisplayNameExists: 'Role display name already exists',
  userBanned: 'User is banned',
  userConfirmationHashesDeletionCron:
    'User confirmation hashes deletion cron error',
  userConfirmationHashDeletion: (hashId: string) =>
    `User confirmation hash deletion error. Hash id: ${hashId}`,
  userDeleted: 'Пользователь удален',
  userNotFound: 'User not found',
  userStatusDisplayNameExists: 'User status display name already exists',
  userStatusNotExist: 'User Status does not exist',
  userStatusNameExists: 'User status name already exists',
};
