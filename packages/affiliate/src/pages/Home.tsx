import HomeHow from '@app/components/home/HomeHow';

import './Home.less';

export default function Home(): JSX.Element {
  return (
    <div className="affiliate affiliate-home">
      {/* <AgentBanner />
      <AgentPlan />
      <AgentCommission />
      <AgentSupport />
      <AgentRights />
      <AgentAdvantage /> */}
      <HomeHow />
      {/* <AgentFaq /> */}
    </div>
  );
}
