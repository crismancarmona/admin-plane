import { Injectable } from '@nestjs/common';
import { Plane } from 'types/dist/domain/plane';

@Injectable()
export class CacheService {
  private planesById = new Map<string, Plane>();

  savePlane(planeId: string, plane: Plane): void {
    this.planesById.set(planeId, plane);
  }

  getAllPlanes(): Map<string, Plane> {
    return this.planesById;
  }

  getById(id: string): Plane | undefined {
    return this.planesById.get(id);
  }
}
