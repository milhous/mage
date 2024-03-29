import {Outlet} from 'react-router-dom';

import HomeBanner from '@app/components/home/HomeBanner';
import HomePlan from '@app/components/home/HomePlan';
import HomeCommission from '@app/components/home/HomeCommission';
import HomeSupport from '@app/components/home/HomeSupport';
import HomeRights from '@app/components/home/HomeRights';
import HomeAdvantage from '@app/components/home/HomeAdvantage';
import HomeHow from '@app/components/home/HomeHow';
import HomeFaq from '@app/components/home/HomeFaq';

import './Home.less';

export default function Home(): JSX.Element {
  return (
    <main className="affiliate affiliate-home">
      <HomeBanner />
      <HomePlan />
      <HomeCommission />
      <HomeSupport />
      <HomeRights />
      <HomeAdvantage />
      <HomeHow />
      <HomeFaq />
      <Outlet />
    </main>
  );
}
