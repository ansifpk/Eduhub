import { Consumer, Kafka, Partitioners, Producer } from 'kafkajs'


class KafkaWrapper {
    private _kafka: Kafka
    private _producer?: Producer;
    private _consumer?: Consumer;
    constructor() {
        this._kafka = new Kafka({
            clientId: 'purchase-service',
            brokers: ['localhost:9092'],
           
        })
    }

    async connect(): Promise<void> {
        try {
            this._producer = this._kafka.producer({ createPartitioner: Partitioners.DefaultPartitioner });
            await this._producer.connect();
            console.log('Connected to Kafka');
        } catch (error) {
            console.error('Error connecting to Kafka:', error);
            
        }
    }

    get producer() {
        if (!this._producer) throw new Error('not producer initialized');
        return this._producer
    };

    get consumer() {
        if (!this._consumer) throw new Error('consumer not initialized');
        return this._consumer;
    }
    
    async createConsumer(groupId: string) {
        this._consumer = this._kafka.consumer({ groupId ,retry: { retries: 5 }});
        await this._consumer.connect();
        console.log('consumer connected');
        return this.consumer
    }



    async disconnectFromKafka() {
        try {
            await this._producer?.disconnect();
            console.log('kafka disconnected')
        } catch (error) {
            console.log('somehting wrong when disconcet kafka')
        }
    }
}

const kafkaWrapper = new KafkaWrapper();

export default kafkaWrapper