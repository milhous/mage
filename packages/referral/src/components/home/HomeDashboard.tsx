import {useState} from 'react';

import {useTranslate} from '@libs/i18n';
import analytics from '@libs/analytics';

import {ReferralEventType} from '@app/types';

import HomeOverview from './HomeOverview';
import HomeChannel from './HomeChannel';
import HomeDetail from './HomeDetail';

import './HomeDashboard.less';

const ReferralDashboard = (): JSX.Element => {
  const t = useTranslate(['referral']);

  const [tabIndex, setTabIndex] = useState<number>(0);

  /**
   * 切换
   * @param {number} type 类型 0:数据概览, 1:邀请链接, 2:邀请明细
   */
  const handleTab = (type: number) => {
    setTabIndex(type);

    switch (type) {
      case 0:
        analytics.customEvent('Referral_link_setup', {
          desc: '点击数据概览tab',
        });

        break;
      case 1:
        analytics.customEvent('Referrals_tab_link', {
          desc: '点击邀请链接tab',
        });

        window.dispatchEvent(new CustomEvent(ReferralEventType.GET_CHANNEL));

        break;
      case 2:
        analytics.customEvent('Referrals_tab_detail', {
          desc: '点击邀请明细tab',
        });

        break;
    }
  };

  return (
    <section className="referral-dashboard">
      <div className="dashboard-container">
        <input type="radio" id="dashboard-overview" name="dashboard" defaultChecked />
        <input type="radio" id="dashboard-links" name="dashboard" />
        <input type="radio" id="dashboard-detail" name="dashboard" />
        <ul className="dashboard-tab">
          <li>
            <label htmlFor="dashboard-overview" onClick={() => handleTab(0)}>
              {t('dashboard_overview')}
            </label>
          </li>
          <li>
            <label htmlFor="dashboard-links" onClick={() => handleTab(1)}>
              {t('dashboard_links')}
            </label>
          </li>
          <li>
            <label htmlFor="dashboard-detail" onClick={() => handleTab(2)}>
              {t('dashboard_detail')}
            </label>
          </li>
        </ul>
        <div className="dashboard-content dashboard-overview">
          <HomeOverview />
        </div>
        <div className="dashboard-content dashboard-links">
          <HomeChannel />
        </div>
        <div className="dashboard-content dashboard-detail">
          <HomeDetail visible={tabIndex === 2} />
        </div>
      </div>
    </section>
  );
};

export default ReferralDashboard;
