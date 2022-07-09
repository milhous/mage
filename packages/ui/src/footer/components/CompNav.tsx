import {useTranslate} from '@libs/i18n';

import './CompNav.less';

// 导航
const CompNav = (): JSX.Element => {
  const t = useTranslate(['footer']);

  return (
    <div className="ui-footer_nav">
      <section>
        <article>
          <dl>
            <dt>{t('match')}</dt>
            <dd>{t('home')}</dd>
            <dd>{t('live')}</dd>
            <dd>{t('blockSports')}</dd>
            <dd>{t('prediction')}</dd>
          </dl>
          <dl>
            <dt>{t('games')}</dt>
            <dd>{t('all')}</dd>
            <dd>{t('self_study')}</dd>
            <dd>{t('slots')}</dd>
            <dd>{t('table_games')}</dd>
            <dd>{t('live_games')}</dd>
            <dd>{t('virtual_games')}</dd>
          </dl>
          <dl>
            <dt>{t('promotions')}</dt>
            <dd>{t('promotions')}</dd>
            <dd>{t('referral')}</dd>
            <dd>{t('affiliate')}</dd>
          </dl>
          <dl>
            <dt>{t('about_us')}</dt>
            <dd>{t('announcement')}</dd>
            <dd>{t('about_bitgame')}</dd>
            <dd>{t('walkthrough')}</dd>
            <dd>{t('terms_of_use')}</dd>
            <dd>{t('privacy_service')}</dd>
            <dd>{t('token_disclaimer')}</dd>
            <dd>{t('responsible')}</dd>
            <dd>{t('selfTermOfUse')}</dd>
            <dd>{t('support_email')}:service@bitgame.com</dd>
          </dl>
        </article>
        <aside>
          <div className="ui-preferences">
            <h3>{t('preferences')}</h3>
          </div>
          <div className="ui-footer_download">
            <h3>{t('app_download')}</h3>
          </div>
        </aside>
      </section>
    </div>
  );
};

export default CompNav;
