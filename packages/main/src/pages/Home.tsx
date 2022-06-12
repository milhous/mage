import {Outlet} from 'react-router-dom';

import UIToolbar from '@ui/toolbar';

import './Home.less';

export default function Home(): JSX.Element {
  return (
    <>
      <UIToolbar />
      Hello world!
      <Outlet />
      Goodbey world!
    </>
  );
}
