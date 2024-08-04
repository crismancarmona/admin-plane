import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'src/core/database/repository';
import { PlaneService } from 'src/plane/service/plane.service';
import { Plane } from '@crisman999/plane-types';

@Injectable()
export class ControlService {
  constructor(
    private readonly repository: Repository,
    private readonly planeService: PlaneService,
  ) {}

  async takeOff(planeId: string): Promise<void> {
    const plane: Plane | undefined = await this.repository.getById(planeId);
    if (!plane) {
      throw new NotFoundException('no plane found with id ' + planeId);
    }
    return this.planeService.takeOff(plane);
  }

  async stopEngine(planeId: string): Promise<void> {
    const plane: Plane | undefined = await this.repository.getById(planeId);
    if (!plane) {
      throw new NotFoundException('no plane found with id ' + planeId);
    }
    return this.planeService.stopEngine(plane);
  }

  async rotate(planeId: string, angle: string): Promise<void> {
    const plane: Plane | undefined = await this.repository.getById(planeId);
    if (!plane) {
      throw new NotFoundException('no plane found with id ' + planeId);
    }

    return this.planeService.rotate(plane, angle);
  }

  async acelerate(planeId: string, velocity: string): Promise<void> {
    const plane: Plane | undefined = await this.repository.getById(planeId);
    if (!plane) {
      throw new NotFoundException('no plane found with id ' + planeId);
    }

    return this.planeService.acelerate(plane, velocity);
  }
}
