// import React, { useState } from 'react';
// import ReactDOM from 'react-dom';
// import classnames from 'classnames';
// import { useTranslation } from 'react-i18next';
// import SVG from 'react-inlinesvg';

// import Modal from '@ui/Modal';
// import i18n from '@/config/i18n';
// import { IGetInvitationChannelData } from '@/api';

// import './ReferralAward.less';
// import assets from '@/assets';

// type ContainerProps = {
//     visible?: boolean;
//     btnClose?: React.ReactNode;
// };

// /**
//  * 数据概览
//  * @property {number} totalRebate 累计返利金额(单位:USDT)
//  * @param {number} totalLutPrize 累计lut奖励金额（单位:LUT）
//  * @property {number} referralCount 邀请用户数
//  * @property {number} referralBetCount 下线投注用户数
//  * @property {number} referralBetAmount 下线投注金额(单位:USDT)
//  */
//  let overview = {
//     totalRebate: 0,
//     referralCount: 0,
//     referralBetCount: 0,
//     referralBetAmount: 0,
//     totalLutPrize: 0
// };

// // 容器
// const Container: React.FC<ContainerProps> = (props) => {
//     const { t } = useTranslation(['referral', 'error'], { i18n });

//     return (
//         <div className="btg-pop award-container">
//             <div className="award-title">
//                 <h3>{t('details')}</h3>
//                 <button className="btn-close">
//                     <SVG src={assets.iconClose} onClick={close} />
//                 </button>
//             </div>
//             <div className="award-content">
//                 <dl>
//                     <dt>{t('invite_friends')}</dt>
//                     <dd>{overview.referralCount}</dd>
//                 </dl>
//                 <dl>
//                     <dt>{t('bet_friends')}</dt>
//                     <dd>{overview.referralBetCount}</dd>
//                 </dl>
//                 <dl>
//                     <dt>{t('bet_amount')}</dt>
//                     <dd>{overview.referralBetAmount} USDT</dd>
//                 </dl>
//                 <dl>
//                     <dt>{t('links_award_lut')}</dt>
//                     <dd>{overview.totalLutPrize} LUT</dd>
//                 </dl>
//                 <dl>
//                     <dt>{t('links_award_usdt')}</dt>
//                     <dd>{overview.totalRebate} USDT</dd>
//                 </dl>
//             </div>
//         </div>
//     );
// };

// let elem: HTMLDivElement;
// let isRender = false;
// let visible: boolean, setVisible: any;

// // 登录
// const Comp = (): JSX.Element => {
//     [visible, setVisible] = useState(false);

//     const onCancel = () => {
//         setVisible(false);
//     };

//     return (
//         <Modal
//         className={classnames('referral-award')}
//         visible={visible}
//         onCancel={onCancel}
//         bodyStyle={undefined}
//         domContainer={elem}
//         isDestroy={true}
//         transClass="bottom_slide_up"
//         >
//             <React.Suspense fallback="Loading">
//                 <Container visible={visible} />
//             </React.Suspense>
//         </Modal>
//     );
// };

// // 显示
// export const show = (data: IGetInvitationChannelData): void => {
//     overview = data;

//     if (!elem) {
//         elem = document.createElement('div');
//         document.body.appendChild(elem);
//     }

//     if (!isRender) {
//         isRender = true;

//         ReactDOM.render(React.createElement(Comp), elem);
//     }

//     if (setVisible) {
//         setTimeout(() => setVisible(true));
//     }
// };

// // 关闭
// export const close = (): void => {
//     if (setVisible) {
//         setVisible(false);
//     }
// };
