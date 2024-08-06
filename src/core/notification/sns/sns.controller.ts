import { PlaneDto } from '@crisman999/plane-types';
import {
  Body,
  Controller,
  Headers,
  HttpCode,
  HttpStatus,
  Logger,
  Post,
} from '@nestjs/common';
import axios from 'axios';
import { StatusService } from '../../../admin/service/status.service';

@Controller('sns')
export class SnsController {
  private readonly logger = new Logger(SnsController.name);

  constructor(private readonly statusService: StatusService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async handleNotification(
    @Body() message: string,
    @Headers('x-amz-sns-message-type') messageType: string,
  ): Promise<string> {
    const snsMessage = JSON.parse(message);
    if (messageType === 'SubscriptionConfirmation') {
      this.logger.log('SNS Connected ');
      await axios.get(snsMessage.SubscribeURL);
    }
    if (messageType === 'Notification') {
      const plane: PlaneDto = { ...snsMessage };
      await this.statusService.updateStatus(plane);
    }
    return 'Notification received';
  }
}
