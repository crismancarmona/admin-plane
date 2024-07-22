import { Module } from '@nestjs/common';
import { AdminController } from './controller/admin.controller';
import { PlaneFactory } from './factory/plane.factory';
import { StatusController } from './controller/status.controller';
import { HttpModule } from '@nestjs/axios';
import { CacheService } from './service/cache.service';
import { ProcessManagerModule } from './factory/process-manager/process-manager.module';
import { ProcessManagerDocker } from './factory/process-manager/process-manager.docker';
import { ProcessManager } from './factory/process-manager/process-manager';

@Module({
  imports: [HttpModule, ProcessManagerModule],
  controllers: [AdminController, StatusController],
  providers: [{
    provide: PlaneFactory, useFactory: async (processManager: ProcessManager) => {
      await processManager.prepareProcess()
      return new PlaneFactory(processManager)
    }, inject: [ProcessManagerDocker]
  }, CacheService],
  exports: [CacheService],
})
export class AdminModule { }
