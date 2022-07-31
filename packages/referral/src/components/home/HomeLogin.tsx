import {Trans} from 'react-i18next';

import {ChannelEventType} from '@libs/config';
import {useThrottle} from '@libs/hooks';
import {useTranslate} from '@libs/i18n';
import {useAccount} from '@libs/account';
import {BTGBroadcastChannel} from '@libs/broadcastChannel';
import analytics from '@libs/analytics';

import {useInviteBasics} from '@app/hooks';
import Assets from '@app/assets';
import {apiDepositPrizeNotify} from '@app/api';

import './HomeLogin.less';
import {useEffect} from 'react';

const channel = new BTGBroadcastChannel();

const HomeLogin = (): JSX.Element => {
  const t = useTranslate(['referral']);
  const {isLogin} = useAccount();
  const {lutPrize, rebateLimit} = useInviteBasics();

  // 事件 - 登录
  const handlerLogin = useThrottle((): void => {
    analytics.customEvent('Click_referral', {
      desc: '未登录状态下点击邀请页“立即邀请好友”按钮',
    });

    // if (isLogin) {
    //   return;
    // }

    // acct.login();

    channel.postMessage({
      type: ChannelEventType.ACCOUNT_CHANGE,
      payload: {
        uid: 1,
        username: 'Milhous',
        email: 'milhous@sina.com',
      },
    });
  }, 1000);

  // 获取奖励提示
  const getPrizeNotify = async (): Promise<void> => {
    const {data} = await apiDepositPrizeNotify({actNo: 'ACT716480A90BP1009'});

    console.log(data);
  };

  useEffect(() => {
    getPrizeNotify();
  }, []);

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
