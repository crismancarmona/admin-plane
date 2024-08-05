import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { chunk } from 'lodash';
import { Repository } from 'src/core/database/repository';
import { PlaneService } from 'src/plane/service/plane.service';
import { Plane, PlaneDto } from '@crisman999/plane-types';

@Injectable()
export class StatusService {
  private readonly logger = new Logger(StatusService.name);

  constructor(private readonly repository: Repository) {}

  async registerPlane(plane: Plane): Promise<void> {
    this.logger.log('Registering a new plane with id: ' + plane.id);
    await this.repository.save(plane);
  }

  async getAllStatuses(): Promise<Plane[]> {
    return this.repository.getAllPlanes();
  }

  async updateStatus(planeDto: PlaneDto): Promise<void> {
    const plane = await this.repository.getById(planeDto.id!);

    if (!plane) {
      throw new NotFoundException(
        `The plane with id ${planeDto.id} does not exist.`,
      );
    }

    plane.stats = planeDto.stats!;
    plane.updatedAt = new Date().toString() as unknown as Date;

    await this.repository.save(plane);
  }
}
