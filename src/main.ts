import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { AllExceptionsFilter } from './filters/all-exceptions.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { DEVELOPMENT } from './common/constants/common-constants';
import * as requestIp from 'request-ip';
import helmet from 'helmet';
import * as cookieParser from 'cookie-parser';
import { WinstonModule } from 'nest-winston';
import { loggerConfiguration } from './logging/configuration';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: WinstonModule.createLogger(loggerConfiguration),
  });
  const configService = app.get(ConfigService);

  app.enableCors({
    origin: true,
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      enableDebugMessages: true,
      validateCustomDecorators: true,
    }),
  );

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  const logger = app.get(Logger);
  app.useGlobalInterceptors(new LoggingInterceptor(logger));
  app.useGlobalFilters(new AllExceptionsFilter(logger, configService));

  const nodeEnv = configService.get('app.nodeEnv');
  const appName = configService.get('app.name');

  const swagger = new DocumentBuilder()
    .setTitle(appName)
    .setDescription(`${appName} API description`)
    .setVersion('1.0')
    .addBearerAuth();

  if (nodeEnv !== DEVELOPMENT) {
    swagger.addServer(configService.get('app.apiPrefix'));
  }

  const swaggerConfig = swagger.build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      tagsSorter: 'alpha',
      operationsSorter: 'method',
    },
  });

  app.use(requestIp.mw());
  app.use(helmet());
  app.use(cookieParser());

  const PORT = configService.get('app.port');
  await app.listen(PORT);
  return PORT;
}
bootstrap().then((PORT) =>
  Logger.log(`App is running on http://localhost:${PORT}`),
);
