import {useTranslate} from '@ui/i18n';
import UISvg from '@ui/svg';

import Assets from '@app/assets';

import './HomeHow.less';

// 如何加入
const HomeHow = (): JSX.Element => {
  const t = useTranslate(['affiliate']);

  return (
    <section className="affiliate-how">
      <h3>{t('how_title')}</h3>
      <div className="how-list">
        <p>{t('how_desc1')}</p>
        <ul>
          <li>
            <div>
              <UISvg src={Assets.HomeHowSN1} className="icon-sn" />
              <UISvg src={Assets.HomeHowIcon1} className="how-icon1" />
            </div>
            <dl>
              <dt>{t('how_subtitle1')}</dt>
              <dd>{t('how_subdesc1')}</dd>
            </dl>
          </li>
          <li>
            <div>
              <UISvg src={Assets.HomeHowSN2} className="icon-sn" />
              <UISvg src={Assets.HomeHowIcon2} className="how-icon2" />
            </div>
            <dl>
              <dt>{t('how_subtitle2')}</dt>
              <dd>{t('how_subdesc2')}</dd>
            </dl>
          </li>
          <li>
            <div>
              <UISvg src={Assets.HomeHowSN3} className="icon-sn" />
              <UISvg src={Assets.HomeHowIcon3} className="how-icon3" />
            </div>
            <dl>
              <dt>{t('how_subtitle3')}</dt>
              <dd>{t('how_subdesc3')}</dd>
            </dl>
          </li>
        </ul>
      </div>
      <a className="btn-apply" href="mailto:support@bitgame.com" title="support@bitgame.com">
        {t('btn_apply')}
      </a>
    </section>
  );
};

export default HomeHow;
