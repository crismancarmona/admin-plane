import { Injectable, NestMiddleware } from '@nestjs/common';
import * as bodyParser from 'body-parser';
import { NextFunction } from 'express';

@Injectable()
export class TextBodyMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    bodyParser.text()(req as any, res as any, next);
  }
}
