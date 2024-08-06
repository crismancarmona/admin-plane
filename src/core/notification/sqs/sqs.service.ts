import {
  SendMessageCommand,
  SendMessageCommandInput,
  SQSClient,
} from '@aws-sdk/client-sqs';
import { ProcessActionDto } from '@crisman999/plane-types';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class SqsService {
  private sqsClient;
  private readonly logger = new Logger(SqsService.name);

  constructor() {
    this.sqsClient = new SQSClient({
      endpoint: 'http://127.0.0.1:4566',
      region: 'us-east-1',
      credentials: {
        accessKeyId: 'foo',
        secretAccessKey: 'bar',
      },
    });
  }

  async sendMessage(processActionDto: ProcessActionDto): Promise<void> {
    try {
      this.logger.log('Sending message', processActionDto);
      const message: SendMessageCommandInput = {
        QueueUrl:
          'https://localhost.localstack.cloud:4566/000000000000/plane-actions-queue',
        MessageBody: JSON.stringify(processActionDto),
      };
      const messageCommand = new SendMessageCommand(message);
      const result = await this.sqsClient.send(messageCommand);
      this.logger.log(result);
    } catch (error) {
      this.logger.error(error);
    }
  }
}
