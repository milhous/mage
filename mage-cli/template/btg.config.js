export default () => {
  return {
    name: '{name}',
    port: '{port}',
    remotes: {},
    exposes: {
      './App': '@app/App',
    },
  };
};
