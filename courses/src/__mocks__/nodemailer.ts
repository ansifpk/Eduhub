const sendMailMock = jest.fn().mockResolvedValue(true);
const closeMock = jest.fn();

const createTransport = jest.fn(() => ({
  sendMail: sendMailMock,
  close: closeMock,
}));

export default { createTransport };
export { sendMailMock, closeMock };
