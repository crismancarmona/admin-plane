import { Plane } from '@crisman999/plane-types';

export interface ProcessManager {
  createPlane(planeId: string, numberId: number): Promise<void>;
  removePlane(plane: Plane): Promise<void>;
}
