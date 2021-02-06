import { Consumer, Kafka, Producer } from 'kafkajs';
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
    if (!this.producer) {
      console.log('creating producer....');
      this.producer = this.kafka.producer();
      await this.producer.connect();
      console.log('Producer Connected!');
    }

    const result = await this.producer.send({
      topic: 'MessageTopic',
      messages: [
        {
          value: JSON.stringify(msg),
          partition: 0,
        },
      ],
    });
    console.log(`Send Successfully! ${JSON.stringify(result)}`);
  }

  public static async consume(job: any) {
    if (!this.consumer) {
      const groupId = process.env.SERVICE_ID || Math.random().toString(36).substring(7);
      this.consumer = this.kafka.consumer({ groupId });
      await this.consumer.connect();
      console.log(`Consumer ${groupId} Connected!`);

      await this.consumer.subscribe({
        topic: 'MessageTopic',
        fromBeginning: true,
      });
    }

    await this.consumer.run({
      eachMessage: async (eventData) => {
        job(eventData);
        console.log(`RVD Msg ${eventData.message.value?.toString()} on partition ${eventData.partition}`);
      },
    });
  }
}

export default KafkaClient;
