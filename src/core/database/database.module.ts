import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Config } from '../Config';
import { InMemoryRepository } from './in-memory.repository';
import { LocalFileRepository } from './local-file.repository';
import { Repository } from './repository';

@Global()
@Module({
  providers: [
    {
      provide: Repository,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const databaseSelector = configService.getOrThrow(Config.REPOSITORY);
        const db =
          databaseSelector === 'csv'
            ? new LocalFileRepository()
            : new InMemoryRepository();
        return db;
      },
    },
  ],
  exports: [Repository],
})
export class DatabaseModule {}
