import { HttpService } from '@nestjs/axios';
import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { Repository } from 'src/core/database/repository';
import { Plane } from 'types/dist/domain/plane';

@Controller('/status')
export class StatusController {
  private readonly logger = new Logger(StatusController.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly repository: Repository,
  ) {
    setInterval(() => this.readPositions(), 2000);
  }

  @Post('/plane/register')
  async registerPlane(@Body() plane: Plane) {
    this.logger.log('Registering a new plane with id: ' + plane.id);
    await this.repository.save(plane);
  }

  @Get()
  async getStatus(): Promise<any> {
    return this.repository.getAllPlanes();
  }

  private async readPositions() {
    const allPlanes = await this.repository.getAllPlanes();
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
}
