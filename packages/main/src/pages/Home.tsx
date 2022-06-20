import {Outlet} from 'react-router-dom';

import UIToolbar from '@ui/toolbar';
import UIHeader from '@ui/header';
import UIFooter from '@ui/footer';

import './Home.less';

export default function Home(): JSX.Element {
  return (
    <>
      <UIToolbar />
      <UIHeader />
      Hello world!
      <Outlet />
      <UIFooter />
    </>
  );
}
