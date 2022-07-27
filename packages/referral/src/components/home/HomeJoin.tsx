import {useTranslate} from '@libs/i18n';
// import analytics from '@libs/analytics';

import './HomeJoin.less';

const ReferralJoin = (): JSX.Element => {
  const t = useTranslate(['referral']);

  // 点击
  const handleClick = () => {
    //   analytics.customEvent('Email_apply', {
    //     desc: '点击邀请页面“立即申请”及“support@bitgame.com”',
    //   });
  };

  return (
    <section className="referral-join">
      <div>
        <dl>
          <dt>{t('join_title')}</dt>
          <dd>{t('join_desc')}</dd>
        </dl>
        <p>
          {t('join_contact')}{' '}
          <a href="mailto:support@bitgame.com" title="support@bitgame.com" onClick={handleClick}>
            support@bitgame.com
          </a>
        </p>
        <a className="btn-apply" href="mailto:support@bitgame.com" title="support@bitgame.com" onClick={handleClick}>
          {t('btn_apply')}
        </a>
      </div>
    </section>
  );
};

export default ReferralJoin;
