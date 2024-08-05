import {
  DynamoDBClient,
  QueryCommand,
  ScanCommand,
} from '@aws-sdk/client-dynamodb';
import { GetCommand, PutCommand } from '@aws-sdk/lib-dynamodb';
import { unmarshall } from '@aws-sdk/util-dynamodb';
import { Plane } from '@crisman999/plane-types';
import { Injectable } from '@nestjs/common';
import { Repository } from '../repository';

const TABLE_NAME = 'plane';

@Injectable()
export class DynamoRepository implements Repository {
  constructor(private readonly dynamoDbClient: DynamoDBClient) {}

  async getAllPlanes(): Promise<Plane[]> {
    const scanCommand = new ScanCommand({
      TableName: TABLE_NAME,
    });
    const result = await this.dynamoDbClient.send(scanCommand);

    const planes = result.Items?.map((item) => unmarshall(item)) as Plane[];

    return planes ?? [];
  }

  async save(plane: Plane): Promise<void> {
    const putCommand = new PutCommand({ TableName: TABLE_NAME, Item: plane });
    await this.dynamoDbClient.send(putCommand);
  }

  async getById(planeId: string): Promise<Plane | undefined> {
    const getCommand = new GetCommand({
      TableName: TABLE_NAME,
      Key: { id: planeId },
    });
    const result = await this.dynamoDbClient.send(getCommand);

    return result.Item as unknown as Plane;
  }
}
