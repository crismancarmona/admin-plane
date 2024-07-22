import { Body, Controller, Param, Post } from '@nestjs/common';
import { ControlService } from './service/control.service';

@Controller('control')
export class ControlController {
  constructor(private readonly controlService: ControlService) {}

  @Post('takeOff/:planeId')
  async takeOffPlane(@Param('planeId') planeId: string) {
    await this.controlService.takeOff(planeId);
  }
}
