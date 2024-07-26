import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Config } from 'src/core/Config';
import { Repository } from 'src/core/database/repository';
import { AdminController } from './controller/admin.controller';
import { StatusController } from './controller/status.controller';
import { PlaneFactory } from './factory/plane.factory';
import { ProcessManagerDocker } from './factory/process-manager/process-manager.docker';
import { ProcessManagerModule } from './factory/process-manager/process-manager.module';
import { ProcessManagerPM2 } from './factory/process-manager/process-manager.pm2';

@Module({
  imports: [HttpModule, ProcessManagerModule],
  controllers: [AdminController, StatusController],
  providers: [
    {
      provide: PlaneFactory,
      inject: [ConfigService, Repository],
      useFactory: (configService: ConfigService, repository: Repository) => {
        const pm2Selector = configService.getOrThrow(Config.PM_PROCESSOR);
        const processManager =
          pm2Selector === 'docker'
            ? new ProcessManagerDocker()
            : new ProcessManagerPM2();
        return new PlaneFactory(processManager, repository);
      },
    },
  ],
})
export class AdminModule {}
