import {Trans} from 'react-i18next';

import {useTranslate} from '@libs/i18n';
import {copy, share} from '@libs/utils';
import analytics from '@libs/analytics';
import {toast, error} from '@widget/toastify';

import {useInviteBasics, useInviteInfo, useInviteChannel} from '@app/hooks';
import Assets from '@app/assets';

// import * as referralCreate from './ReferralCreate';
import './HomeBanner.less';

const ReferralBanner = (): JSX.Element => {
  const t = useTranslate(['referral']);
  const {lutPrize, rebateLimit, inviteLimit} = useInviteBasics();
  const {code, link} = useInviteInfo();
  const channel = useInviteChannel();

  // 创建
  const handleCreate = () => {
    analytics.customEvent('Referral_link_setup', {
      desc: '点击创建新的邀请链接按钮',
    });

    if (channel.length < inviteLimit) {
      // referralCreate.show();
    } else {
      error(t('tips_limit'));
    }
  };

  /**
   * 复制
   * @param {number} str 文案
   * @param {number} type 类型 0:邀请码，1:邀请链接
   */
  const handleCopy = (str: string, type: number): void => {
    if (type === 0) {
      analytics.customEvent('Referral_code_copy', {
        desc: '点击邀请码复制按钮',
      });
    } else {
      analytics.customEvent('Referral_link_copy', {
        desc: '点击邀请链接复制按钮',
      });
    }

    copy(str);

    // toast(langInfo.copy_success);
  };

  /**
   * 分享
   * @param {string} type 分享类型 facebook, twitter, telegram
   */
  const handleShare = (type: string): void => {
    switch (type) {
      case 'facebook':
        analytics.customEvent('Referral_share_facebook', {
          desc: '点击分享至facebook按钮',
        });

        break;
      case 'twitter':
        analytics.customEvent('Referral_share_twitter', {
          desc: '点击分享至twitter按钮',
        });

        break;
      case 'telegram':
        analytics.customEvent('Referral_share_telegram', {
          desc: '点击分享至telegram按钮',
        });

        break;
    }

    const title = t('share', {code});

    share(type, {
      title,
      url: link,
    });
  };

  return (
    <section className="referral-banner">
      <div>
        <dl className="banner-slogan">
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
        </dl>
        <div className="banner-share">
          <div>
            <dl>
              <dt>{t('share_title')}</dt>
              <dd>
                <span onClick={handleCreate}>{t('btn_create_new')} +</span>
              </dd>
            </dl>
            <ul>
              <li>
                <span>{t('invite_code')}</span>
                <strong>{code}</strong>
                <button className="btn-copy" onClick={() => handleCopy(code, 0)}>
                  <Assets.HomeIconCopy />
                </button>
              </li>
              <li>
                <span>{t('invite_link')}</span>
                <strong>{link}</strong>
                <button className="btn-copy" onClick={() => handleCopy(link, 1)}>
                  <Assets.HomeIconCopy />
                </button>
              </li>
            </ul>
            {!('native' in window) && (
              <dl>
                <dt>{t('invite_share')}</dt>
                <dd>
                  <button className="btn-share" onClick={() => handleShare('telegram')}>
                    <Assets.HomeIconTelegram />
                  </button>
                  <button className="btn-share" onClick={() => handleShare('twitter')}>
                    <Assets.HomeIconTwitter />
                  </button>
                  <button className="btn-share" onClick={() => handleShare('facebook')}>
                    <Assets.HomeIconFacebook />
                  </button>
                </dd>
              </dl>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReferralBanner;
