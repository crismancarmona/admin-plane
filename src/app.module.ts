import { Module } from '@nestjs/common';
import { AdminModule } from './admin/admin.module';
import { ControlModule } from './control/control.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    AdminModule,
    ControlModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
})
export class AppModule {}
