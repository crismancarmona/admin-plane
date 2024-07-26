import { Injectable, Logger } from '@nestjs/common';
import fs from 'fs';
import { Plane } from 'types/dist/domain/plane';
import { Repository } from './repository';

const FILE_PATH = './database/local.csv';

@Injectable()
export class LocalFileRepository implements Repository {
  private readonly logger = new Logger(LocalFileRepository.name);

  async getAllPlanes(): Promise<Plane[]> {
    const file = fs.readFileSync(FILE_PATH);

    const stringFile = file.toString();

    const lines = stringFile.split('\n');

    const planes = lines
      .filter((line) => line !== '')
      .map((line) => {
        const columns = line.split(';');

        const plane: Plane = new Plane(
          columns[0],
          Number(columns[1]),
          columns[3],
        );
        plane.currentPosition = columns[2]
          ? JSON.parse(columns[2])
          : { x: 0, y: 0, z: 0 };
        plane.updatedAt = new Date(Number(columns[4]));

        return plane;
      });

    return planes.filter((plane) => plane.id !== undefined && plane.id !== '');
  }

  async save(plane: Plane): Promise<void> {
    const allPlanes = await this.getAllPlanes();

    const index = allPlanes.findIndex(
      (savedPlane) => savedPlane.id === plane.id,
    );

    if (index < 0) {
      allPlanes.push(plane);
    } else {
      allPlanes[index] = plane;
    }

    await this.saveAll(allPlanes);
  }

  private async saveAll(planes: Plane[]): Promise<void> {
    try {
      if (planes.length > 0) {
        const lines = planes.map((plane) => this.planeToCSV(plane));
        const newContent = lines.join('');
        fs.writeFileSync(FILE_PATH, newContent);
      }
    } catch (error) {
      this.logger.error(error);
    }
  }

  async getById(planeId: string): Promise<Plane | undefined> {
    const allPlanes = await this.getAllPlanes();

    return allPlanes.find((plane) => plane.id === planeId);
  }

  private planeToCSV(plane: Plane): string {
    return `\n${plane.id};${plane.numberId};${JSON.stringify(
      plane.currentPosition ?? { x: 0, y: 0, z: 0 },
    )};${plane.port};${
      plane.updatedAt instanceof Date
        ? plane.updatedAt.getTime()
        : plane.updatedAt
    }`;
  }
}
