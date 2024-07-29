import { Injectable, Logger } from '@nestjs/common';
import { chunk } from 'lodash';
import { Repository } from 'src/core/database/repository';
import { PlaneService } from 'src/plane/service/plane.service';
import { Plane } from 'types/dist/domain/plane';
import { RadarService } from '../output/radar.service';

@Injectable()
export class StatusService {
  private readonly logger = new Logger(StatusService.name);

  constructor(
    private readonly planeService: PlaneService,
    private readonly repository: Repository,
    private readonly radarService: RadarService,
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
            updatedPlane.updatedAt = new Date();
            await this.repository.save(updatedPlane);
          } catch (error) {
            this.logger.warn(
              `There is no communication with the plane with id ${plane.id}`,
            );
          }
        });
    });

    const positions = allPlanes.map((plane) => {
      return {
        x: plane.currentPosition!.x,
        y: plane.currentPosition!.y,
        name: String(plane.numberId),
      };
    });
    this.radarService.drawRadar(positions);
  }

  async registerPlane(plane: Plane): Promise<void> {
    this.logger.log('Registering a new plane with id: ' + plane.id);
    await this.repository.save(plane);
  }

  async getAllStatuses(): Promise<Plane[]> {
    return this.repository.getAllPlanes();
  }
}
