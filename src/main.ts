import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MONGODB_URI, PORT } from './utils/constants';

async function bootstrap() {
  console.log(PORT, MONGODB_URI, 444444);
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT, () => console.log(PORT));
}
bootstrap();
 