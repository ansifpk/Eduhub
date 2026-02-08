const Stripe = jest.fn().mockImplementation(() => {
  return {
    checkout: {
      sessions: {
        create: jest.fn(),
      },
    },
    subscriptions: {
      create: jest.fn(),
    },
    customers: {
      create: jest.fn(),
    },
    webhooks: {
      constructEvent: jest.fn(),
    },
  };
});

export default Stripe;
