import { Body, Controller, Post } from '@nestjs/common';
import { PlaneFactory } from '../factory/plane.factory';

@Controller('/admin')
export class AdminController {
  constructor(private readonly planeFactory: PlaneFactory) {}

  @Post()
  async createInitPlanes(): Promise<boolean> {
    //await this.planeFactory.createPlane(1);
    await this.planeFactory.createPlane(2);
    await this.planeFactory.createPlane(3);
    await this.planeFactory.createPlane(4);
    await this.planeFactory.createPlane(5);
    await this.planeFactory.createPlane(6);

    return true;
  }

  @Post('/createNewPlane')
  async createNewPlane(@Body() dto: { id: number }): Promise<boolean> {
    this.planeFactory.createPlane(dto.id);
    return true;
  }
}
