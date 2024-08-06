import { forwardRef, Module } from '@nestjs/common';
import { AdminModule } from 'src/admin/admin.module';
import { SnsController } from './sns/sns.controller';
import { SnsService } from './sns/sns.service';
import { SqsService } from './sqs/sqs.service';

@Module({
  imports: [forwardRef(() => AdminModule)],
  controllers: [SnsController],
  providers: [SnsService, SqsService],
  exports: [SnsService, SqsService],
})
export class NotificationModule {}
