import {Trans} from 'react-i18next';

import {useTranslate} from '@ui/i18n';
import UISvg from '@ui/svg';

import Assets from '@app/assets';

import './HomePlan.less';

// 联盟计划
const HomePlan = (): JSX.Element => {
  const t = useTranslate(['affiliate']);

  return (
    <section className="affiliate-plan">
      <article>
        <h3>{t('plan_title')}</h3>
        <p>
          <Trans t={t} i18nKey="plan_subtitle" values={{percent: '<span>7.8%</span>'}} />
        </p>
        <ul>
          <li>{t('plan_desc1')}</li>
          <li>{t('plan_desc2')}</li>
          <li>{t('plan_desc3')}</li>
          <li>
            <Trans t={t} i18nKey="plan_desc4" values={{reward: '<span>300 USDT</span>'}} />
          </li>
        </ul>
      </article>
      <aside>
        <dl>
          <dt>
            <UISvg src={Assets.HomePlanIcon1} />
          </dt>
          <dd>{t('plan_data1')}</dd>
        </dl>
        <dl>
          <dt>
            <UISvg src={Assets.HomePlanIcon2} className="plan-icon2" />
          </dt>
          <dd>{t('plan_data2')}</dd>
        </dl>
        <dl>
          <dt>
            <UISvg src={Assets.HomePlanIcon3} className="plan-icon3" />
          </dt>
          <dd>{t('plan_data3')}</dd>
        </dl>
        <dl>
          <dt>
            <UISvg src={Assets.HomePlanIcon4} className="plan-icon4" />
          </dt>
          <dd>{t('plan_data4')}</dd>
        </dl>
      </aside>
    </section>
  );
};

export default HomePlan;
