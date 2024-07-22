import { HttpService } from '@nestjs/axios';
import { Injectable, NotFoundException } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { CacheService } from 'src/admin/service/cache.service';
import { Plane } from 'types/dist/domain/plane';
import { Action } from 'types/dist/process/Action';
import { ProcessActionDto } from 'types/dist/process/ProcessActionDto';

@Injectable()
export class ControlService {
  constructor(
    private readonly httpService: HttpService,
    private readonly cacheService: CacheService,
  ) {}

  async takeOff(planeId: string): Promise<void> {
    const plane = this.cacheService.getById(planeId);
    if (!plane) {
      throw new NotFoundException('no plane found with id ' + planeId);
    }
    const url = 'http://localhost:' + plane.port + '/plane/processAction';
    const processAction: ProcessActionDto = {
      action: Action.TAKE_OFF,
    };
    await firstValueFrom(this.httpService.post(url, processAction));
  }
}
