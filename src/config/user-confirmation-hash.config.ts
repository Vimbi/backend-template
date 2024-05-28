import { registerAs } from '@nestjs/config';

export default registerAs('userConfirmationHash', () => ({
  cronDeleteExpired: process.env.USER_CONFIRMATION_HASH_CRON_DELETE_EXPIRED,
  lifespan: parseInt(process.env.USER_CONFIRMATION_HASH_LIFE_SPAN, 10) || 5, // minutes
}));
