import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Headers,
  Request,
} from '@nestjs/common';
import { StatusService } from '../service/status.service';
import { PlaneDto } from '@crisman999/plane-types';
import { HttpService } from '@nestjs/axios';
import axios from 'axios';

@Controller('sns')
export class SnsController {
  constructor(
    private readonly statusService: StatusService,
    private readonly httpService: HttpService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async handleNotification(
    @Body() message: string,
    @Headers('x-amz-sns-message-type') messageType: string,
  ): Promise<string> {
    const snsMessage = JSON.parse(message);
    if (messageType === 'SubscriptionConfirmation') {
      await axios.get(snsMessage.SubscribeURL);
    }
    if (messageType === 'Notification') {
      const plane: PlaneDto = { ...snsMessage };
      await this.statusService.updateStatus(plane);
    }
    return 'Notification received';
  }
}
