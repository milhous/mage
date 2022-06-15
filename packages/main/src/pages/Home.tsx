import {Outlet} from 'react-router-dom';

import UIToolbar from '@ui/toolbar';
import UIFooter from '@ui/footer';

import './Home.less';

export default function Home(): JSX.Element {
  return (
    <>
      <UIToolbar />
      Hello world!
      <Outlet />
      <UIFooter />
      Goodbey world!
    </>
  );
}
