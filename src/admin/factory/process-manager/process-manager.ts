export interface ProcessManager {
  createPlane(planeId: string, numberId: number): Promise<void>;
}
