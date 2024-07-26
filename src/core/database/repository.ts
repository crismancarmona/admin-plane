import { Plane } from 'types/dist/domain/plane';

export abstract class Repository {
  abstract getAllPlanes(): Promise<Plane[]>;
  abstract save(plane: Plane): Promise<void>;
  abstract getById(planeId: string): Promise<Plane | undefined>;
}
