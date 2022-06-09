export default () => {
  return {
    name: 'main',
    port: 3000,
    remotes: {},
    exposes: {
      './App': '@app/App',
    },
  };
};
