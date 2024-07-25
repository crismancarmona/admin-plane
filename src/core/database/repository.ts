import { Plane } from 'types/dist/domain/plane';

export abstract class Repository {
  abstract getAllPlanes(): Promise<Plane[]>;
  abstract saveAll(planes: Plane[]): Promise<void>;
  abstract save(plane: Plane): Promise<void>;
}
