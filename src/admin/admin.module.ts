import { Module } from '@nestjs/common';
import { AdminController } from './controller/admin.controller';
import { PlaneFactory } from './factory/plane.factory';
import { StatusController } from './controller/status.controller';
import { HttpModule } from '@nestjs/axios';
import { CacheService } from './service/cache.service';

@Module({
  imports: [HttpModule],
  controllers: [AdminController, StatusController],
  providers: [PlaneFactory, CacheService],
  exports: [CacheService],
})
export class AdminModule {}
