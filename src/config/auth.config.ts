import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
  codeLifespan: parseInt(process.env.AUTH_CODE_LIFESPAN) || 2,
  expires: process.env.AUTH_JWT_TOKEN_EXPIRES_IN,
  hashExpires: process.env.AUTH_HASH_EXPIRES_IN,
  majorityAge: parseInt(process.env.AUTH_AGE_OF_MAJORITY, 10) || 18,
  recaptchaSecretKey: process.env.RECAPTCHA_SECRET_KEY,
  refreshTokenExpires: process.env.AUTH_JWT_refreshToken_EXPIRES_IN,
  saltRounds: parseInt(process.env.SALT_ROUNDS, 10) || 10,
  secret: process.env.AUTH_JWT_SECRET,
  secretRefreshToken: process.env.AUTH_JWT_REFRESH_SECRET,
  smsCodeLength: parseInt(process.env.AUTH_SMS_CODE_LENGTH, 10) || 6,
}));
