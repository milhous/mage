import {useTranslate} from '@libs/i18n';

// import Popover from '@ui/Popover';

import {useInviteOverview} from '@app/hooks';
import Assets from '@app/assets';

import './HomeOverview.less';

// 数据概览
const HomeOverview = (): JSX.Element => {
  const t = useTranslate(['referral']);
  const {totalRebate, referralCount, referralBetCount, referralBetAmount} = useInviteOverview();

  return (
    <ul className="referral-overview">
      <li>
        <h3>{t('overview_earnings')}</h3>
        <dl>
          <dt>USDT</dt>
          <dd>
            <span>{totalRebate}</span>
          </dd>
        </dl>
      </li>
      <li>
        <h3>{t('invite_friends')}</h3>
        <dl>
          <dt>
            <Assets.HomeIconNums className="icon-nums" />
          </dt>
          <dd>{referralCount}</dd>
        </dl>
      </li>
      <li>
        <h3>{t('bet_friends')}</h3>
        <dl>
          <dt>
            <Assets.HomeIconNums className="icon-nums" />
          </dt>
          <dd>{referralBetCount}</dd>
        </dl>
      </li>
      <li>
        <h3>
          <span>{t('bet_amount')}</span>
          {/* <Popover
            title={isMobile ? '' : false}
            content={<p className="referral-overview_tips">{t('overview_tips')}</p>}
            placement="right"
            isMobile={isMobile}
            isTips
          >
            <SVG src={assets.iconHelp} className="icon-help" />
          </Popover> */}
        </h3>
        <dl>
          <dt>USDT</dt>
          <dd>{referralBetAmount}</dd>
        </dl>
      </li>
    </ul>
  );
};

export default HomeOverview;
