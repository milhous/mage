import {Trans} from 'react-i18next';

import {useTranslate} from '@ui/i18n';

import Assets from '@app/assets';

import './HomeCommission.less';

// 代理佣金
const HomeCommission = (): JSX.Element => {
  const t = useTranslate(['affiliate']);

  return (
    <section className="affiliate-commission">
      <div>
        <aside>
          <dl>
            <dd>
              <img src={Assets.HomeCommissionIcon1} className="commission-icon1" />
            </dd>
            <dt>Sports Betting</dt>
          </dl>
          <dl>
            <dd>
              <img src={Assets.HomeCommissionIcon2} className="commission-icon2" />
            </dd>
            <dt>In-house</dt>
          </dl>
          <dl>
            <dd>
              <img src={Assets.HomeCommissionIcon3} className="commission-icon3" />
            </dd>
            <dt>Casino</dt>
          </dl>
          <dl>
            <dd>
              <img src={Assets.HomeCommissionIcon4} className="commission-icon4" />
            </dd>
            <dt>Live Casino</dt>
          </dl>
          <dl>
            <dd>
              <img src={Assets.HomeCommissionIcon5} className="commission-icon5" />
            </dd>
            <dt>Table Games</dt>
          </dl>
          <dl>
            <dd>
              <img src={Assets.HomeCommissionIcon6} className="commission-icon6" />
            </dd>
            <dt>Virtual Sports</dt>
          </dl>
        </aside>
        <article>
          <h3>
            <Trans t={t} i18nKey="commission_title" values={{percent: '<span>50%</span>'}} />
          </h3>
          <ul>
            <li>{t('commission_desc1')}</li>
            <li>
              <Trans t={t} i18nKey="commission_desc2" values={{percent: '<span>10%</span>'}} />
            </li>
          </ul>
        </article>
      </div>
    </section>
  );
};

export default HomeCommission;
