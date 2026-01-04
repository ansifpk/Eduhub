export default {
  createTransport() {
    return {
      sendMail: jest.fn().mockResolvedValue({ messageId: 'test-id' }),
      close: jest.fn(),
    };
  },
};
