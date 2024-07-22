import { HttpService } from '@nestjs/axios';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { CacheService } from '../service/cache.service';

@Controller('/status')
export class StatusController {
  constructor(
    private readonly httpService: HttpService,
    private readonly cachePlaneService: CacheService,
  ) {
    setInterval(() => this.readPositions(), 2000);
  }

  @Post('/plane/register/:id')
  async registerPlane(@Param('id') id: string, @Body() body: any) {
    console.log('registrando ' + id + ' ' + JSON.stringify(body));
    this.cachePlaneService.savePlane(id, body);
  }

  @Get()
  async getStatus(): Promise<any> {
    const allPlanes = this.cachePlaneService.getAllPlanes();
    return {
      planes: Array.from(allPlanes.keys()),
      values: Array.from(allPlanes.values()),
    };
  }

  private readPositions() {
    this.cachePlaneService.getAllPlanes().forEach(async (plane, key) => {
      const url = 'http://127.0.0.1:' + plane.port + '/plane/status';

      try {
        const response = await firstValueFrom(this.httpService.get(url));
        this.cachePlaneService.savePlane(key, { ...plane, ...response.data });
      } catch (error) {
        console.error(
          `There is no communication with the plane with id ${key}`,
        );
      }
    });
    console.log(new Date());
    console.log(
      Array.from(this.cachePlaneService.getAllPlanes().values())
        .sort((a, b) => (a.id > b.id ? 1 : 0))
        .map((plane) => {
          return { currentPosition: plane.currentPosition, id: plane.id };
        }),
    );
  }
}
