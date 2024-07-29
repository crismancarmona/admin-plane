import { Injectable } from '@nestjs/common';
import fs from 'fs';

const FILE_PATH = './database/game.txt';

@Injectable()
export class RadarService {
  drawRadar(positions: { x: number; y: number; name: string }[]) {
    const width = 125;
    const height = 23;
    const scale = 5;

    const radar = Array.from({ length: height }, () => Array(width).fill(' '));

    positions.forEach(
      ({ x, y, name }: { x: number; y: number; name: string }) => {
        const radarX = Math.round(((x + 550) / (scale * 2)) % width);
        const radarY = Math.round(((y + 100) / (scale * 2)) % height);

        if (radarX >= 0 && radarX < width && radarY >= 0 && radarY < height) {
          if (x > 0 || y > 0) {
            radar[height - radarY - 1][radarX] = `➔${name} A=${y}m - V=0km/h`;
          } else {
            radar[height - radarY - 1][radarX] = name;
          }
        }
      },
    );

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
}
