import { Module } from '@nestjs/common';
import { AdminModule } from './admin/admin.module';
import { ControlModule } from './control/control.module';

@Module({
  imports: [AdminModule, ControlModule],
})
export class AppModule {}
