import { Body, Controller, Get, Post } from '@nestjs/common';
import { Plane } from '@crisman999/plane-types';
import { StatusService } from '../service/status.service';

@Controller('/status')
export class StatusController {
  constructor(private readonly statusService: StatusService) {
    setInterval(() => this.statusService.readPositions(), 2000);
  }

  @Post('/plane/register')
  async registerPlane(@Body() plane: Plane) {
    await this.statusService.registerPlane(plane);
  }

  @Get()
  async getStatus(): Promise<any> {
    return this.statusService.getAllStatuses();
  }
}
