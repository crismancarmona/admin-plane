import { NestFactory } from '@nestjs/core';
import { AdminController } from './admin/controller/admin.controller';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.listen(3000);

  const adminController = app.get(AdminController);

  await adminController.createInitPlanes();
}
bootstrap();
