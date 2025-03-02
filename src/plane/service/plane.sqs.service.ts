import { Action, Plane, ProcessActionDto } from '@crisman999/plane-types';
import { Injectable, Logger } from '@nestjs/common';
import { SqsService } from 'src/core/notification/sqs/sqs.service';
import { PlaneService } from './plane.service';

@Injectable()
export class PlaneSqsService extends PlaneService {
  private readonly logger = new Logger(PlaneSqsService.name);

  constructor(private readonly sqsService: SqsService) {
    super();
  }

  async takeOff(plane: Plane): Promise<void> {
    const actionDto: ProcessActionDto = {
      action: Action.TAKE_OFF,
      planeId: plane.id,
    };
    return this.processAction<void>(actionDto);
  }

  async stopEngine(plane: Plane): Promise<void> {
    const actionDto: ProcessActionDto = {
      action: Action.STOP_ENGINE,
      planeId: plane.id,
    };
    return this.processAction<void>(actionDto);
  }

  async rotate(plane: Plane, angle: string): Promise<void> {
    const actionDto: ProcessActionDto = {
      action: Action.ROTATE,
      params: { angle },
      planeId: plane.id,
    };
    return this.processAction<void>(actionDto);
  }

  async acelerate(plane: Plane, velocity: string): Promise<void> {
    const actionDto: ProcessActionDto = {
      action: Action.ACELERATE,
      params: { velocity },
      planeId: plane.id,
    };
    return this.processAction<void>(actionDto);
  }

  private async processAction<T>(
    processAction: ProcessActionDto,
  ): Promise<void> {
    try {
      await this.sqsService.sendMessage(processAction);
    } catch (error) {
      this.logger.error(error);
    }
  }
}
