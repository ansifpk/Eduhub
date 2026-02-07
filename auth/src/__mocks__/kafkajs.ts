const connect = jest.fn();
const disconnect = jest.fn();
const send = jest.fn();

const subscribe = jest.fn();
const run = jest.fn();

export const Kafka = jest.fn().mockImplementation(() => ({
  producer: () => ({
    connect,
    send,
    disconnect,
  }),
  consumer: () => ({
    connect,
    subscribe,
    run,
    disconnect,
  }),
}));

// optional: export mocks for assertions
export const producerMocks = { connect, send, disconnect };
export const consumerMocks = { connect, subscribe, run, disconnect };
