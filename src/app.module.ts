import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AdminModule } from './admin/admin.module';
import { ControlModule } from './control/control.module';
import { DatabaseModule } from './core/database/database.module';
import { NotificationModule } from './core/notification/notification.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    AdminModule,
    ControlModule,
    NotificationModule,
  ],
})
export class AppModule {}
