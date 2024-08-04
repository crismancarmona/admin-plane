import { Body, Controller, Param, Post, Query } from '@nestjs/common';
import { ControlService } from './service/control.service';

@Controller('control')
export class ControlController {
  constructor(private readonly controlService: ControlService) {}

  @Post('takeOff/:planeId')
  async takeOffPlane(@Param('planeId') planeId: string) {
    await this.controlService.takeOff(planeId);
  }

  @Post('stopEngine/:planeId')
  async stopEngine(@Param('planeId') planeId: string) {
    await this.controlService.stopEngine(planeId);
  }

  @Post('rotate/:planeId')
  async rotate(
    @Param('planeId') planeId: string,
    @Query('angle') angle: string,
  ) {
    await this.controlService.rotate(planeId, angle);
  }

  @Post('acelerate/:planeId')
  async acelerate(
    @Param('planeId') planeId: string,
    @Query('velocity') velocity: string,
  ) {
    await this.controlService.acelerate(planeId, velocity);
  }
}
