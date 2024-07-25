import { Injectable, Logger } from '@nestjs/common';
import { exec } from 'child_process';
import { promisify } from 'util';
import { ProcessManager } from './process-manager';

@Injectable()
export class ProcessManagerDocker implements ProcessManager {
  private readonly logger = new Logger(ProcessManagerDocker.name);

  async createPlane(id: string, numberId: number): Promise<void> {
    try {
      const execPromise = promisify(exec);

      await execPromise(
        `docker rm -f ${id} && docker run -d -p 300${numberId}:300${numberId} -e PLANE_PORT=300${numberId} -e PLANE_NAME=${id}  -e PLANE_NUMBER_ID=${numberId} --name ${id} plane:latest`,
      );
      this.logger.log('The plane ' + id + ' was created successfully');
    } catch (error) {
      this.logger.error(error);
    }
  }
}
