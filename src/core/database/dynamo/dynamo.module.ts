import { Module } from '@nestjs/common';
import { DynamoRepository } from './dynamo.repository';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

@Module({
  providers: [
    DynamoRepository,
    {
      provide: DynamoDBClient,
      useFactory: () => {
        const client = new DynamoDBClient({
          region: 'us-east-1',
          endpoint: 'http://localhost:4566', // Endpoint para LocalStack
          credentials: {
            accessKeyId: 'foo',
            secretAccessKey: 'bar',
          },
        });
        return DynamoDBDocumentClient.from(client);
      },
    },
  ],
  exports: [DynamoRepository],
})
export class DynamoModule {}
