import {Suspense, lazy, useState} from 'react';
import {Outlet} from 'react-router-dom';

import loadComponent from '@libs/loadComponent';
import {UIType} from '@libs/types';
import WidgetSpinner from '@widget/spinner';

// import UIToolbar from 'ui';
// import UIHeader from 'ul/header';
// import UIFooter from '@ui/footer';

import './Home.less';

interface ISystem {
  remote: string;
  url: string;
  module: string;
}

const System = (props: {system: ISystem; type: number}): JSX.Element => {
  const {system, type} = props;
  const {remote, module, url} = system;

  const Component = lazy(loadComponent(remote, 'default', module, url));

  return (
    <Suspense fallback={<WidgetSpinner />}>
      <Component type={type} />
    </Suspense>
  );
};

export default function Home(): JSX.Element {
  const [system, setSystem] = useState({
    remote: 'ui',
    url: 'https://www.local.devbitgame.com:9001/remoteEntry.js',
    module: './App',
  });

  return (
    <>
      <System system={system} type={UIType.TOOLBAR} />
      <System system={system} type={UIType.HEADER} />
      Hello world!
      <Outlet />
      <System system={system} type={UIType.FOOTER} />
    </>
  );
}
