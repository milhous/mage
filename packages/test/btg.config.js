export default () => {
  return {
    name: 'test',
    port: 9011,
    remotes: {},
    exposes: {
      './App': '@app/App',
    },
  };
};
