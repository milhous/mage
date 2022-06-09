export default () => {
  return {
    name: 'affiliate',
    port: 9013,
    remotes: {},
    exposes: {
      './App': '@app/App',
    },
  };
};
