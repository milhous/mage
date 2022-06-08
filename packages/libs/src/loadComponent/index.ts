import {getOrLoadRemote} from './getOrLoadRemote';

const loadComponent = (remote: string, sharedScope: string, module: string, url: string) => {
  return async () => {
    await getOrLoadRemote(remote, sharedScope, url);
    const container = window[remote];
    const factory = await container.get(module);
    const Module = factory();
    return Module;
  };
};

export default loadComponent;
