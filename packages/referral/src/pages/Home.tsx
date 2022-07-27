import {Outlet} from 'react-router-dom';

import HomeLogin from '@app/components/home/HomeLogin';
import HomeHow from '@app/components/home/HomeHow';
import HomeJoin from '@app/components/home/HomeJoin';
import HomeFaq from '@app/components/home/HomeFaq';

import './Home.less';

export default function Home(): JSX.Element {
  return (
    <main className="referral referral-home">
      <HomeLogin />
      <HomeHow />
      <HomeJoin />
      <HomeFaq />
      <Outlet />
    </main>
  );
}
