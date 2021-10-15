import { ValidationPipe } from '@nestjs/common';
import { NestApplication, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MONGODB_URI, PORT } from './utils/constants';
import Swagger from './utils/swagger';

async function bootstrap() {
  const app: NestApplication = await NestFactory.create(AppModule, {
    cors: true,
  });
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api/v1');

  const swagger = new Swagger(app);
  swagger.setup();
  await app
    .listen(PORT)
    .then(() => console.log(`App is running in port ${PORT}`));
}
bootstrap();
