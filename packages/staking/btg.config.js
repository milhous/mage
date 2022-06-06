export default () => {
  return {
    name: 'staking',
    port: 9010,
    remotes: {
      '@test': `test@http://127.0.0.1:8881/emp.js`,
    },
    exposes: {
      './App': '@app/App',
    },
    shared: {
      react: {eager: true, singleton: true},
      'react-dom': {eager: true, singleton: true},
      'react-i18next': {eager: true, singleton: true},
      'react-inlinesvg': {eager: true, singleton: true},
      'react-router-dom': {eager: true, singleton: true},
    },
  };
};
