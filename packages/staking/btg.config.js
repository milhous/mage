export default () => {
  return {
    name: 'staking',
    port: 9010,
    remotes: {
      // 'test': `test@http://127.0.0.1:8881/emp.js`,
      // app1: 'app1@http://localhost:3001/remoteEntry.js',
    },
    exposes: {
      './App': '@app/App',
    },
  };
};
