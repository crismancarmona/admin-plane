import { Injectable } from '@nestjs/common';
import { Repository } from 'src/core/database/repository';
import { ProcessManager } from './process-manager/process-manager';

@Injectable()
export class PlaneFactory {
  constructor(
    private readonly processManager: ProcessManager,
    private readonly repository: Repository,
  ) {}

  public async initStart(): Promise<void> {
    /*const planes = await this.repository.getAllPlanes();
    const promises = planes.map((plane) =>
      this.createPlane(plane.id, plane.numberId),
    );
    await Promise.all(promises);*/
  }

  public async createPlane(id: string, numberId: number): Promise<void> {
    await this.processManager.createPlane(id, numberId);
  }
}
