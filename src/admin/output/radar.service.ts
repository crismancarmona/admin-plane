import { Injectable } from '@nestjs/common';
import fs from 'fs';
import { Plane } from 'types/dist/domain/plane';

const FILE_PATH = './database/game.txt';

@Injectable()
export class RadarService {
  drawRadar(planes: Plane[]) {
    const width = 125;
    const height = 23;
    const scale = 5;

    const radar = Array.from({ length: height }, () => Array(width).fill(' '));

    planes.forEach((plane) => {
      const x = plane.stats.x ?? 0;
      const y = plane.stats.y ?? 0;
      const z = plane.stats.z ?? 0;
      const name = plane.numberId;
      const angleChar = this.rotateCharacter(plane.stats.angle ?? 0);
      const vel = plane.stats.velocity;

      const radarX = Math.round(((x + 550) / (scale * 2)) % width);
      const radarY = Math.round(((y + 100) / (scale * 2)) % height);

      if (radarX >= 0 && radarX < width && radarY >= 0 && radarY < height) {
        if (x !== 0 || y !== 0) {
          radar[height - radarY - 1][radarX] =
            `${angleChar} ${name} A=${z}m - V=${vel}km/h`;
        } else {
          radar[height - radarY - 1][radarX] = name;
        }
      }
    });

    radar[13][56] = '_';
    radar[13][57] = '_';
    radar[13][58] = '_';
    radar[13][59] = '_';
    radar[13][60] = '_';
    radar[13][61] = '_';
    radar[13][62] = '_';
    radar[13][63] = '_';
    radar[13][64] = '_';
    radar[13][65] = '_';
    radar[13][66] = '_';
    radar[13][67] = '_';
    radar[13][68] = '_';

    const lines = radar.map((row) => row.join('')).join('\n');

    fs.writeFileSync(FILE_PATH, lines);
  }

  rotateCharacter(angle: number) {
    const airplaneStates = [
      '➡️', // 0 degrees
      '↗️', // 45 degrees
      '⬆️', // 90 degrees
      '↖️', // 135 degrees
      '⬅️', // 180 degrees
      '↙️', // 225 degrees
      '⬇️', // 270 degrees
      '↘️', // 315 degrees
    ];

    angle = angle % 360;
    if (angle < 0) angle += 360;

    const index = Math.round(angle / 45) % airplaneStates.length;

    return airplaneStates[index];
  }
}
