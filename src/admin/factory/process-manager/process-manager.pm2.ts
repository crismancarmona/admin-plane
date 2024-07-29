import { Injectable } from '@nestjs/common';
import { exec } from 'child_process';
import { promisify } from 'util';
import { ProcessManager } from './process-manager';
import { Plane } from 'types/dist/domain/plane';

@Injectable()
export class ProcessManagerPM2 implements ProcessManager {
  async removePlane(plane: Pick<Plane, 'id'>): Promise<void> {
    try {
      const exexPromise = promisify(exec);

      await exexPromise(`pm2 stop ${plane.id}`, { timeout: 1000 });
    } catch (error) {
      console.warn('The plane does not exist. Creating it.');
    }
  }
  async createPlane(id: string, numberId: number): Promise<void> {
    await this.removePlane({ id });

    const exexPromise = promisify(exec);

    try {
      await exexPromise(`pm2 stop ${id}`, { timeout: 1000 });
    } catch (error) {
      console.warn('The plane does not exist. Creating it.');
    }

    try {
      const command = `set AVION_NAME=${id}&& set AVION_PORT=300${numberId}&& pm2 start ../avion/dist/main.js -f --name ${id} --no-autorestart --merge-logs`;
      console.debug(command);
      await exexPromise(command, { timeout: 1000 });
      console.debug('plane ' + id + ' was created');
    } catch (error) {
      console.error(error);
    }
  }
}
