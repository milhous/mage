import {Outlet} from 'react-router-dom';

import './Home.less';

export default function Home(): JSX.Element {
  return (
    <>
      Hello world!
      <Outlet />
      Goodbey world!
    </>
  );
}
