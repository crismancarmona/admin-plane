import { NestFactory } from '@nestjs/core';
import { PlaneFactory } from './admin/factory/plane.factory';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({ origin: 'http://localhost:4000' });

  await app.listen(3000);

  const planeFactory = app.get(PlaneFactory);

  await planeFactory.initStart();
}
bootstrap();
