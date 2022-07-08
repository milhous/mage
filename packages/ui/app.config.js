export default () => {
  return {
    name: 'ui',
    port: 9001,
    remotes: {},
    exposes: {
      './App': '@app/App',
    },
  };
};
