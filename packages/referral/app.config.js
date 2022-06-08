export default () => {
  return {
    name: 'referral',
    port: 9007,
    remotes: {},
    exposes: {
      './App': '@app/App',
    },
  };
};
