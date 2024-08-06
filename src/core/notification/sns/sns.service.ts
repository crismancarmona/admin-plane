import {
  DeleteEndpointCommand,
  ListSubscriptionsByTopicCommand,
  SNSClient,
  SubscribeCommand,
  UnsubscribeCommand,
} from '@aws-sdk/client-sns';
import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';

const TOPIC_ARN = 'arn:aws:sns:us-east-1:000000000000:plane-status-topic';
const SUSCRIPTION_ENDPOINT = 'http://host.docker.internal:3000/sns';

@Injectable()
export class SnsService implements OnApplicationBootstrap {
  private readonly logger = new Logger(SnsService.name);
  private readonly snsClient: SNSClient;

  constructor() {
    this.snsClient = new SNSClient({
      endpoint: 'http://127.0.0.1:4566',
      region: 'us-east-1',
      credentials: {
        accessKeyId: 'foo',
        secretAccessKey: 'bar',
      },
    });
  }

  async onApplicationBootstrap() {
    setImmediate(async () => {
      await this.unsubscribe();
      await this.subscribe();
    });
  }

  private async unsubscribe() {
    try {
      const listSubscriptionsByTopicCommand =
        new ListSubscriptionsByTopicCommand({
          TopicArn: TOPIC_ARN,
        });
      const resultList = await this.snsClient.send(
        listSubscriptionsByTopicCommand,
      );
      const subscription = resultList.Subscriptions?.find(
        (subscription) => subscription.Endpoint === SUSCRIPTION_ENDPOINT,
      );
      if (subscription?.SubscriptionArn) {
        const unsubscribeCommand = new UnsubscribeCommand({
          SubscriptionArn: subscription.SubscriptionArn,
        });
        await this.snsClient.send(unsubscribeCommand);
      }
    } catch (error) {
      this.logger.warn(error);
    }
  }

  private async subscribe() {
    const subscribeCommand = new SubscribeCommand({
      TopicArn: TOPIC_ARN,
      Protocol: 'http',
      Endpoint: SUSCRIPTION_ENDPOINT,
      Attributes: {
        RawMessageDelivery: 'true',
      },
    });
    await this.snsClient.send(subscribeCommand);
  }
}
