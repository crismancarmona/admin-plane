import { Injectable, Logger } from '@nestjs/common';
import { chunk } from 'lodash';
import { Repository } from 'src/core/database/repository';
import { PlaneService } from 'src/plane/service/plane.service';
import { Plane } from '@crisman999/plane-types';

@Injectable()
export class StatusService {
  private readonly logger = new Logger(StatusService.name);

  constructor(
    private readonly planeService: PlaneService,
    private readonly repository: Repository,
  ) {}

  async readPositions(): Promise<void> {
    const allPlanes = await this.repository.getAllPlanes();

    const planeChunks = chunk(allPlanes, 10);

    planeChunks.forEach((planeChunk: Plane[]) => {
      planeChunk
        .filter((plane) => plane.port !== undefined)
        .forEach(async (plane) => {
          try {
            const updatedPlane = await this.planeService.getStatus(plane);
            updatedPlane.updatedAt = new Date().toString() as unknown as Date;
            await this.repository.save(updatedPlane);
          } catch (error) {
            this.logger.warn(
              `There is no communication with the plane with id ${plane.id}`,
              error,
            );
          }
        });
    });
  }

  async registerPlane(plane: Plane): Promise<void> {
    this.logger.log('Registering a new plane with id: ' + plane.id);
    await this.repository.save(plane);
  }

  async getAllStatuses(): Promise<Plane[]> {
    return this.repository.getAllPlanes();
  }
}
