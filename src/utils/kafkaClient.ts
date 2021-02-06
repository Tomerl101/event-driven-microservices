import { Consumer, Kafka, Producer } from 'kafkajs';
import HttpError from '../errors/httpError';
import { Message } from '../interfaces/messages.interface';

class KafkaClient {
  private static kafka: Kafka = new Kafka({
    clientId: process.env.SERVICE_ID,
    brokers: [`${process.env.KAFKA_HOST}:${process.env.KAFKA_PORT}`],
  });

  private static producer: Producer;
  private static consumer: Consumer;

  // Lazy loading producer connection
  public static async produce(msg: Message) {
    try {
      if (!this.producer) {
        console.log('Creating Kafka producer....');
        this.producer = this.kafka.producer();
        await this.producer.connect();
        console.log('Producer connected successfully!');
      }

      console.log(`Producer start sending msg: ${msg}`);
      const result = await this.producer.send({
        topic: 'MessageTopic',
        messages: [
          {
            value: JSON.stringify(msg),
            partition: 0,
          },
        ],
      });
      console.log(`Producer Send Msg Successfully! ${JSON.stringify(result)}`);
    } catch (error) {
      console.log('Producer Failed to send message with error: ', error);
      throw new HttpError(500, 'Server Internal Error');
    }
  }

  public static async consume(job: any) {
    try {
      if (!this.consumer) {
        const groupId = process.env.SERVICE_ID || Math.random().toString(36).substring(7);
        console.log(`Consumer ${groupId} Trying to Connect Kafka...`);
        this.consumer = this.kafka.consumer({ groupId });
        await this.consumer.connect();
        console.log(`Consumer ${groupId} connected successfully!`);

        await this.consumer.subscribe({
          topic: 'MessageTopic',
          fromBeginning: false,
        });
      }

      await this.consumer.run({
        eachMessage: async (eventData) => {
          console.log(
            `Recived new Msg ${eventData.message.value?.toString()} on partition ${eventData.partition}`
          );
          job(eventData);
        },
      });
    } catch (error) {
      console.log('Consumer Failed to handle message with error: ', error);
      // Handle error however you like
    }
  }
}

export default KafkaClient;
