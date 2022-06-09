import HomeBanner from '@app/components/home/HomeBanner';
import HomePlan from '@app/components/home/HomePlan';
import HomeCommission from '@app/components/home/HomeCommission';
import HomeSupport from '@app/components/home/HomeSupport';
import HomeRights from '@app/components/home/HomeRights';
import HomeAdvantage from '@app/components/home/HomeAdvantage';
import HomeHow from '@app/components/home/HomeHow';

import './Home.less';

export default function Home(): JSX.Element {
  return (
    <div className="affiliate affiliate-home">
      <HomeBanner />
      <HomePlan />
      <HomeCommission />
      <HomeSupport />
      <HomeRights />
      <HomeAdvantage />
      <HomeHow />
      {/* <AgentFaq /> */}
    </div>
  );
}
