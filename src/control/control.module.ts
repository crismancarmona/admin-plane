import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ControlController } from './control.controller';
import { ControlService } from './service/control.service';
import { AdminModule } from 'src/admin/admin.module';

@Module({
  imports: [HttpModule, AdminModule],
  controllers: [ControlController],
  providers: [ControlService],
})
export class ControlModule {}
