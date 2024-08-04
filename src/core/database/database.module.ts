import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Config } from '../Config';
import { InMemoryRepository } from './in-memory.repository';
import { LocalFileRepository } from './local-file.repository';
import { Repository } from './repository';
import { DynamoModule } from './dynamo/dynamo.module';
import { DynamoRepository } from './dynamo/dynamo.repository';

@Global()
@Module({
  imports: [DynamoModule],
  providers: [
    {
      provide: Repository,
      inject: [ConfigService, DynamoRepository],
      useFactory: (
        configService: ConfigService,
        dynamoRepository: DynamoRepository,
      ) => {
        const databaseSelector = configService.getOrThrow(Config.REPOSITORY);
        const db =
          databaseSelector === 'csv'
            ? new LocalFileRepository()
            : databaseSelector === 'aws'
              ? dynamoRepository
              : new InMemoryRepository();
        return db;
      },
    },
  ],
  exports: [Repository],
})
export class DatabaseModule {}
