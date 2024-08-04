import { Action, Plane, ProcessActionDto } from '@crisman999/plane-types';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs';

const BASE_URL = 'http://127.0.0.1:';

@Injectable()
export class PlaneService {
  constructor(private readonly httpService: HttpService) {}

  async takeOff(plane: Plane): Promise<void> {
    const actionDto: ProcessActionDto = {
      action: Action.TAKE_OFF,
    };
    return this.processAction<void>(plane, actionDto);
  }

  async stopEngine(plane: Plane): Promise<void> {
    const actionDto: ProcessActionDto = {
      action: Action.STOP_ENGINE,
    };
    return this.processAction<void>(plane, actionDto);
  }

  async rotate(plane: Plane, angle: string): Promise<void> {
    const actionDto: ProcessActionDto = {
      action: Action.ROTATE,
      params: { angle },
    };
    return this.processAction<void>(plane, actionDto);
  }

  async acelerate(plane: Plane, velocity: string): Promise<void> {
    const actionDto: ProcessActionDto = {
      action: Action.ACELERATE,
      params: { velocity },
    };
    return this.processAction<void>(plane, actionDto);
  }

  async getStatus(plane: Plane): Promise<Plane> {
    const url = `${BASE_URL + plane.port}/plane/status`;

    const response = await firstValueFrom<AxiosResponse<Plane>>(
      this.httpService.get(url),
    );

    return response.data;
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
