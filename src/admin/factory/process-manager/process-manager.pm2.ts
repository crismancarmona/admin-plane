import { Injectable } from "@nestjs/common";
import { exec } from "child_process";
import { promisify } from "util";
import { ProcessManager } from "./process-manager";

@Injectable()
export class ProcessManagerPM2 implements ProcessManager {
  async prepareProcess(): Promise<void> {
    return;
  }
  async createPlane(planeId: number): Promise<void> {
    console.log('Creating ' + planeId);

    const exexPromise = promisify(exec);

    try {
      await exexPromise(`pm2 stop avion_${planeId}`, { timeout: 1000 });
    } catch (error) {
      console.warn('The plane does not exist. Creating it.');
    }

    try {
      const command = `set AVION_NAME=avion_${planeId}&& set AVION_PORT=300${planeId}&& pm2 start ../avion/dist/main.js -f --name avion_${planeId} --no-autorestart --merge-logs`;
      console.debug(command);
      await exexPromise(command, { timeout: 1000 });
      console.debug('plane ' + planeId + ' was created');
    } catch (error) {
      console.error(error);
    }
  }
}