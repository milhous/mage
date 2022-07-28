import {Outlet} from 'react-router-dom';

import {useAccount, changeAccount} from '@libs/account';

import HomeLogin from '@app/components/home/HomeLogin';
import HomeHow from '@app/components/home/HomeHow';
import HomeJoin from '@app/components/home/HomeJoin';
import HomeFaq from '@app/components/home/HomeFaq';

import './Home.less';

export default function Home(): JSX.Element {
  const {isLogin} = useAccount();

  return (
    <main className="referral referral-home">
      <div>{isLogin ? '4444' : '3333'}</div>
      <HomeLogin />
      <HomeHow />
      <HomeJoin />
      <HomeFaq />
      <Outlet />
    </main>
  );
}
