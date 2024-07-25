import { Module } from '@nestjs/common';
import { LocalFileRepository } from './local-file.repository';

@Module({
  providers: [LocalFileRepository],
  exports: [LocalFileRepository],
})
export class DatabaseModule {}
