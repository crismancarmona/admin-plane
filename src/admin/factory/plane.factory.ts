import { Injectable } from '@nestjs/common';
import { exec } from 'child_process';
import { promisify } from 'util';
import { ProcessManager } from './process-manager/process-manager';

@Injectable()
export class PlaneFactory {

  constructor(private readonly processManager: ProcessManager) {
  }

  public async createPlane(planeId: number): Promise<void> {
    await this.processManager.createPlane(planeId);
  }
}
