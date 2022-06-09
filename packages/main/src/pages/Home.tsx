import React, {useState, useEffect} from 'react';

import loadComponent from '@libs/loadComponent';

import './Home.less';

interface ISystem {
  remote: string;
  url: string;
  module: string;
}

const System = (props: {system: ISystem}): JSX.Element => {
  const {system} = props;
  const {remote, module, url} = system;

  const Component = React.lazy(loadComponent(remote, 'default', module, url));

  return (
    <React.Suspense fallback="Loading System">
      <Component />
    </React.Suspense>
  );
};

export default function Home(): JSX.Element {
  const [system, setSystem] = useState({
    remote: 'affiliate',
    url: 'https://www.local.devbitgame.com:9013/remoteEntry.js',
    module: './App',
  });

  return (
    <div>
      <System system={system} />
    </div>
  );
}
