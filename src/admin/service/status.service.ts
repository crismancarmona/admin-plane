import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { Repository } from 'src/core/database/repository';
import { Plane } from 'types/dist/domain/plane';

@Injectable()
export class StatusService {
  private readonly logger = new Logger(StatusService.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly repository: Repository,
  ) {}

  async readPositions(): Promise<void> {
    const allPlanes = await this.repository.getAllPlanes();

    // use lodash for chunk petitions

    allPlanes
      .filter((plane) => plane.port !== undefined)
      .forEach(async (plane) => {
        const url = 'http://127.0.0.1:' + plane.port + '/plane/status';

        try {
          const response = await firstValueFrom(this.httpService.get(url));
          const updatedPlane = response.data as Plane;
          updatedPlane.updatedAt = new Date();
          await this.repository.save(updatedPlane);
        } catch (error) {
          this.logger.warn(
            `There is no communication with the plane with id ${plane.id}`,
          );
        }
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
