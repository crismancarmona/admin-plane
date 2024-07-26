import { HttpService } from '@nestjs/axios';
import { Injectable, NotFoundException } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { Repository } from 'src/core/database/repository';
import { Plane } from 'types/dist/domain/plane';
import { Action } from 'types/dist/process/Action';
import { ProcessActionDto } from 'types/dist/process/ProcessActionDto';

@Injectable()
export class ControlService {
  constructor(
    private readonly httpService: HttpService,
    private readonly repository: Repository,
  ) {}

  async takeOff(planeId: string): Promise<void> {
    const plane: Plane | undefined = await this.repository.getById(planeId);
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
