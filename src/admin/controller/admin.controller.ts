import { Body, Controller, Post } from '@nestjs/common';
import { PlaneFactory } from '../factory/plane.factory';
import { Plane } from 'types/dist/domain/plane';

@Controller('/admin')
export class AdminController {
  constructor(private readonly planeFactory: PlaneFactory) {}

  @Post('/createNewPlane')
  async createNewPlane(
    @Body() dto: Pick<Plane, 'id' | 'numberId'>,
  ): Promise<void> {
    await this.planeFactory.createPlane(dto.id, dto.numberId);
  }
}
