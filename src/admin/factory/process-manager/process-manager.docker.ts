import { Injectable } from "@nestjs/common";
import { exec } from "child_process";
import { promisify } from "util";
import { ProcessManager } from "./process-manager";

@Injectable()
export class ProcessManagerDocker implements ProcessManager {

  async prepareProcess(): Promise<void> {
    const execPromise = promisify(exec);
    const result = await execPromise('cd C:\\Users\\USUARIO\\Documents\\plane\\plane\\ && docker build . -t plane:latest')
    console.log(result)
  }

  async createPlane(planeId: number): Promise<void> {
    const execPromise = promisify(exec);

    const result = await execPromise(`docker rm -f plane-${planeId} && docker run -d -p 300${planeId}:300${planeId} -e AVION_PORT=300${planeId} -e AVION_NAME=plane_${planeId} --name plane-${planeId} plane:latest`)
    console.log(result)
  }
}