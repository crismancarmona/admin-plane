import { Module } from '@nestjs/common';
import { AdminModule } from 'src/admin/admin.module';
import { PlaneModule } from 'src/plane/plane.module';
import { ControlController } from './control.controller';
import { ControlService } from './service/control.service';

@Module({
  imports: [AdminModule, PlaneModule],
  controllers: [ControlController],
  providers: [ControlService],
})
export class ControlModule {}
