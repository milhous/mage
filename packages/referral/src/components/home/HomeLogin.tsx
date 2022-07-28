import {Trans} from 'react-i18next';

import {useTranslate} from '@libs/i18n';
// import analytics from '@libs/analytics';
import {useThrottle} from '@libs/hooks';
import {useAccount, changeAccount} from '@libs/account';

import {useInviteBasics} from '@app/hooks';
import Assets from '@app/assets';

import './HomeLogin.less';

const HomeLogin = (): JSX.Element => {
  const t = useTranslate(['referral']);
  // const {isLogin} = useAccount();
  const {lutPrize, rebateLimit} = useInviteBasics();

  // 事件 - 登录
  const handlerLogin = useThrottle((): void => {
    // analytics.customEvent('Click_referral', {
    //   desc: '未登录状态下点击邀请页“立即邀请好友”按钮',
    // });
    // if (isLogin) {
    //   return;
    // }
    // acct.login();
    // changeAccount(1, 'Milhous', 'milhous@sina.com');
  }, 1000);

  return (
    <section className="referral-login">
      <div>
        <dl>
          <dt>{t('banner_title')}</dt>
          <dd>
            <Trans
              t={t}
              i18nKey="login_desc"
              values={{
                lutPrize: `<strong>${lutPrize} LUT</strong>`,
                rebateLimit: `<strong>${rebateLimit} USDT</strong>`,
              }}
            />
          </dd>
          <dd>
            <button className="btn-invite" onClick={handlerLogin}>
              {t('btn_invite')}
            </button>
          </dd>
        </dl>
        <i>
          <img src={Assets.homeLoginElem} className="icon-elem" />
        </i>
      </div>
    </section>
  );
};

export default HomeLogin;
