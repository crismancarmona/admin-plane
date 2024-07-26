import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AdminModule } from 'src/admin/admin.module';
import { ControlController } from './control.controller';
import { ControlService } from './service/control.service';
import { DatabaseModule } from 'src/core/database/database.module';

@Module({
  imports: [HttpModule, AdminModule],
  controllers: [ControlController],
  providers: [ControlService],
})
export class ControlModule {}
