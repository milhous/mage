export default () => {
  return {
    name: '{name}',
    port: '{port}',
    remotes: {},
    exposes: {},
    shared: {
      react: {eager: true, singleton: true},
      'react-dom': {eager: true, singleton: true},
      'react-i18next': {eager: true, singleton: true},
      'react-inlinesvg': {eager: true, singleton: true},
      'react-router-dom': {eager: true, singleton: true},
    },
  };
};
