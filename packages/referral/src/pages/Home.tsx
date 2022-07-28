import {Outlet} from 'react-router-dom';

import {useAccount, changeAccount} from '@libs/account';

import HomeLogin from '@app/components/home/HomeLogin';
import HomeBannner from '@app/components/home/HomeBanner';
import HomeHow from '@app/components/home/HomeHow';
import HomeJoin from '@app/components/home/HomeJoin';
import HomeFaq from '@app/components/home/HomeFaq';

import './Home.less';

export default function Home(): JSX.Element {
  const {isLogin} = useAccount();

  return (
    <main className="referral referral-home">
      {!isLogin && <HomeLogin />}
      {isLogin && <HomeBannner />}
      <HomeHow />
      <HomeJoin />
      <HomeFaq />
      <Outlet />
    </main>
  );
}
