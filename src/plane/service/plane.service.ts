import { Plane } from '@crisman999/plane-types';

export abstract class PlaneService {
  abstract takeOff(plane: Plane): Promise<void>;
  abstract stopEngine(plane: Plane): Promise<void>;
  abstract rotate(plane: Plane, angle: string): Promise<void>;
  abstract acelerate(plane: Plane, velocity: string): Promise<void>;
}
