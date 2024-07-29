import { Plane } from 'types/dist/domain/plane';

export interface ProcessManager {
  createPlane(planeId: string, numberId: number): Promise<void>;
  removePlane(plane: Plane): Promise<void>;
}
