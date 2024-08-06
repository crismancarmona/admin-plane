import { HttpModule, HttpService } from '@nestjs/axios';
import { forwardRef, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Config } from 'src/core/Config';
import { NotificationModule } from 'src/core/notification/notification.module';
import { SqsService } from 'src/core/notification/sqs/sqs.service';
import { PlaneRestService } from './service/plane.rest.service';
import { PlaneService } from './service/plane.service';
import { PlaneSqsService } from './service/plane.sqs.service';

@Module({
  imports: [forwardRef(() => NotificationModule), HttpModule],
  providers: [
    {
      provide: PlaneService,
      useFactory: (
        configService: ConfigService,
        sqsClient: SqsService,
        httpService: HttpService,
      ) => {
        const communcationPlanes = configService.getOrThrow(
          Config.COMMUNICATION_PLANES,
        );
        const planeService =
          communcationPlanes === 'sqs'
            ? new PlaneSqsService(sqsClient)
            : new PlaneRestService(httpService);
        return planeService;
      },
      inject: [ConfigService, SqsService, HttpService],
    },
  ],
  exports: [PlaneService],
})
export class PlaneModule {}
