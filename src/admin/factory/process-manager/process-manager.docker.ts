import { Injectable, Logger } from '@nestjs/common';
import { exec } from 'child_process';
import { promisify } from 'util';
import { ProcessManager } from './process-manager';
import { Plane } from '@crisman999/plane-types';

@Injectable()
export class ProcessManagerDocker implements ProcessManager {
  private readonly execPromise = promisify(exec);

  private readonly logger = new Logger(ProcessManagerDocker.name);

  async createPlane(id: string, numberId: number): Promise<void> {
    try {
      await this.removePlane({ id });
      await this.execPromise(
        `docker run -d -p 300${numberId}:300${numberId} -e PLANE_PORT=300${numberId} -e PLANE_NAME=${id}  -e PLANE_NUMBER_ID=${numberId} --cpus="1.0" --name ${id} --network admin-plane_default plane:latest`,
      );
      this.logger.log('The plane ' + id + ' was created successfully');
    } catch (error) {
      this.logger.error(error);
    }
  }

  async removePlane(plane: Pick<Plane, 'id'>): Promise<void> {
    try {
      this.logger.log('Removing');
      await this.execPromise(`docker rm -f ${plane.id}`);
    } catch (error) {
      this.logger.error(error);
    }
  }
}
