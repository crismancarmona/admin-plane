import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PlaneService } from './service/plane.service';

@Module({
  providers: [PlaneService],
  imports: [HttpModule],
  exports: [PlaneService],
})
export class PlaneModule {}
