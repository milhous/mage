// import SVG from 'react-inlinesvg';
// import { useMedia } from 'react-use';
// import { useTranslation } from 'react-i18next';

// import Popover from '@ui/Popover';

// import i18n from '@/config/i18n';
// import { useInviteOverview } from '@/api/hook';
// import assets from '@/assets';

// import './ReferralOverview.less';

// // 数据概览
// const ReferralOverview = (): JSX.Element => {
//     const { t } = useTranslation('referral', { i18n });
//     const isMobile = useMedia('(max-width: 768px)');
//     const overview = useInviteOverview();

//     return (
//         <ul className="referral-overview">
//             <li>
//                 <h3>{t('overview_earnings')}</h3>
//                 <dl>
//                     <dt>USDT</dt>
//                     <dd><span>{overview.totalRebate}</span></dd>
//                 </dl>
//             </li>
//             <li>
//                 <h3>{t('invite_friends')}</h3>
//                 <dl>
//                     <dt><SVG src={assets.iconNums} className="icon-nums" /></dt>
//                     <dd>{overview.referralCount}</dd>
//                 </dl>
//             </li>
//             <li>
//                 <h3>{t('bet_friends')}</h3>
//                 <dl>
//                     <dt><SVG src={assets.iconNums} className="icon-nums" /></dt>
//                     <dd>{overview.referralBetCount}</dd>
//                 </dl>
//             </li>
//             <li>
//                 <h3>
//                     <span>{t('bet_amount')}</span>
//                     <Popover
//                         title={isMobile ? '' : false}
//                         content={<p className="referral-overview_tips">{t('overview_tips')}</p>}
//                         placement="right"
//                         isMobile={isMobile}
//                         isTips
//                         >
//                         <SVG src={assets.iconHelp} className="icon-help" />
//                     </Popover>
//                 </h3>
//                 <dl>
//                     <dt>USDT</dt>
//                     <dd>{overview.referralBetAmount}</dd>
//                 </dl>
//              </li>
//         </ul>
//     );
// }

// export default ReferralOverview;
