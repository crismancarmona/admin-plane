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

    const planes = lines.map((line) => {
      const columns = line.split(';');
      const plane: Plane = {
        id: columns[0],
        numberId: Number(columns[1]),
        currentPosition: columns[2]
          ? JSON.parse(columns[2])
          : { x: 0, y: 0, z: 0 },
      };

      return plane;
    });

    return planes.filter((plane) => plane.id !== undefined && plane.id !== '');
  }

  async saveAll(planes: Plane[]): Promise<void> {
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

  async save(plane: Plane): Promise<void> {
    try {
      fs.appendFileSync(FILE_PATH, this.planeToCSV(plane));
    } catch (error) {
      this.logger.error(error);
    }
  }

  private planeToCSV(plane: Plane): string {
    return `\n${plane.id};${plane.numberId};${JSON.stringify(
      plane.currentPosition ?? { x: 0, y: 0, z: 0 },
    )}`;
  }
}
