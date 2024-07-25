import { HttpService } from '@nestjs/axios';
import { Body, Controller, Get, Logger, Param, Post } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { CacheService } from '../service/cache.service';
import { Repository } from 'src/core/database/repository';

@Controller('/status')
export class StatusController {
  private readonly logger = new Logger(StatusController.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly cachePlaneService: CacheService,
    private readonly repository: Repository,
  ) {
    setInterval(() => this.readPositions(), 2000);
  }

  @Post('/plane/register/:id')
  async registerPlane(@Param('id') id: string, @Body() body: any) {
    this.logger.log('New plane in memory with ' + id);
    this.cachePlaneService.savePlane(id, body);
  }

  @Get()
  async getStatus(): Promise<any> {
    const allPlanes = this.cachePlaneService.getAllPlanes();
    return {
      values: Array.from(allPlanes.values()),
    };
  }

  private async readPositions() {
    this.cachePlaneService.getAllPlanes().forEach(async (plane, key) => {
      const url = 'http://127.0.0.1:' + plane.port + '/plane/status';

      try {
        const response = await firstValueFrom(this.httpService.get(url));
        this.cachePlaneService.savePlane(key, { ...plane, ...response.data });
        const planes = Array.from(
          this.cachePlaneService.getAllPlanes().values(),
        );
        this.repository.saveAll(planes.sort((a, b) => a.numberId - b.numberId));
      } catch (error) {
        console.error(
          `There is no communication with the plane with id ${key}`,
        );
      }
    });
  }
}
