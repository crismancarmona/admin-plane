import { Injectable } from '@nestjs/common';
import { Repository } from './repository';
import { Plane } from '@crisman999/plane-types';

@Injectable()
export class InMemoryRepository implements Repository {
  private planesById = new Map<string, Plane>();

  async getAllPlanes(): Promise<Plane[]> {
    return Array.from(this.planesById.values());
  }

  async save(plane: Plane): Promise<void> {
    this.planesById.set(plane.id, plane);
  }

  async getById(planeId: string): Promise<Plane | undefined> {
    return this.planesById.get(planeId);
  }
}
