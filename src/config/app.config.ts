import { registerAs } from '@nestjs/config';
import * as appRoot from 'app-root-path';

export default registerAs('app', () => ({
  nodeEnv: process.env.NODE_ENV,
  name: process.env.APP_NAME,
  workingDirectory: appRoot.path,
  frontendDomain: process.env.FRONTEND_DOMAIN,
  backendDomain: process.env.BACKEND_DOMAIN,
  port: parseInt(process.env.APP_PORT || process.env.PORT, 10) || 4000,
  apiPrefix: process.env.API_PREFIX || 'api',
  timeZone: process.env.TIME_ZONE,
}));
