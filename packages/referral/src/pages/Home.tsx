import {Outlet} from 'react-router-dom';

import './Home.less';

export default function Home(): JSX.Element {
  return (
    <main className="affiliate affiliate-home">
      Hello world!
      <Outlet />
    </main>
  );
}
