import { Action, Plane, ProcessActionDto } from '@crisman999/plane-types';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs';

const BASE_URL = 'http://127.0.0.1:';

@Injectable()
export class PlaneRestService {
  constructor(private readonly httpService: HttpService) {}

  async takeOff(plane: Plane): Promise<void> {
    const actionDto: ProcessActionDto = {
      action: Action.TAKE_OFF,
      planeId: plane.id,
    };
    return this.processAction<void>(plane, actionDto);
  }

  async stopEngine(plane: Plane): Promise<void> {
    const actionDto: ProcessActionDto = {
      action: Action.STOP_ENGINE,
      planeId: plane.id,
    };
    return this.processAction<void>(plane, actionDto);
  }

  async rotate(plane: Plane, angle: string): Promise<void> {
    const actionDto: ProcessActionDto = {
      action: Action.ROTATE,
      params: { angle },
      planeId: plane.id,
    };
    return this.processAction<void>(plane, actionDto);
  }

  async acelerate(plane: Plane, velocity: string): Promise<void> {
    const actionDto: ProcessActionDto = {
      action: Action.ACELERATE,
      params: { velocity },
      planeId: plane.id,
    };
    return this.processAction<void>(plane, actionDto);
  }

  private async processAction<T>(
    plane: Plane,
    processAction: ProcessActionDto,
  ): Promise<T> {
    const url = `${BASE_URL + plane.port}/plane/processAction`;

    const response = await firstValueFrom<AxiosResponse<T>>(
      this.httpService.post(url, processAction),
    );

    return response.data;
  }
}
