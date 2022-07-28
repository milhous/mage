// import { Trans, useTranslation } from 'react-i18next';
// import SVG from 'react-inlinesvg';

// import { toast, error } from '@ui/Toastify';
// import { useUITranslate } from '@ui/useUITranslate';
// import analytics from '@libs/analytics';
// import { useWindowResize } from '@libs/utils/util';
// import { copy } from '@libs/utils/util';
// import { useThrottle } from '@libs/utils/hooks';

// import i18n from '@/config/i18n';
// import { ReferralEventType } from '@/api/hook';
// import { OK_CODE, apiGetInvitationDefault, IGetInvitationChannelData } from '@/api';
// import { useInviteBasics, useInviteChannel } from '@/api/hook';

// import * as referralCreate from './ReferralCreate';
// import * as referralEdit from './ReferralEdit';
// import * as ReferralAward from './ReferralAward';
// import './ReferralChannel.less';
// import assets from '@/assets';

// // 根据时间戳获取本地时间
// const getLocaleTime = (timestamp: number): string => {
//     const date: Date = new Date(timestamp);
//     const time: string[] = date.toLocaleString('zh', { hour12: false }).split(' ');

//     return time[0];
// };

// // 获取邀请链接
// const getInviteLink = (code: string): string => {
//     return `${location.origin}/?invite=${code}`;
// };

// // 邀请链接
// const ReferralChannel = (): JSX.Element => {
//     const { t } = useTranslation(['referral', 'error'], { i18n });
//     const { innerWidth } = useWindowResize();
//     const langInfo = useUITranslate();
//     const { inviteLimit } = useInviteBasics();
//     const channel = useInviteChannel();

//     // 创建
//     const handleCreate = () => {
//         analytics.customEvent('Referral_link_setup', {
//             desc: '点击创建新的邀请链接按钮',
//         });

//         if (channel.length < inviteLimit) {
//             referralCreate.show();
//         } else {
//             error(t('tips_limit'));
//         }
//     };

//     // 复制
//     const handleCopy = (str: string): void => {
//         analytics.customEvent('Referral_link_copy', {
//             desc: '点击邀请链接复制按钮',
//         });

//         copy(str);

//         toast(langInfo.copy_success);
//     };

//     /**
//      * 修改
//      * @param {string} remark 备注
//      * @param {string} code 邀请码
//      */
//     const handleEdit = (remark: string, code: string): void => {
//         analytics.customEvent('Refferals_tab_link_Edit_note', {
//             desc: '点击修改备注按钮',
//         });

//         referralEdit.show({
//             remark,
//             code
//         })
//     };

//     // 设置默认
//     const handleDefault = useThrottle(async (data: string): Promise<void> => {
//         try {
//             const res: any = await apiGetInvitationDefault({
//                 inviteCode: data
//             });

//             const code = res.rspCode;

//             if (code === OK_CODE) {
//                 toast(t('set_succeed'));

//                 window.dispatchEvent(new CustomEvent(ReferralEventType.GET_CHANNEL));
//             } else {
//                 const msg: string = i18n.t('error:error_' + code);

//                 if (msg) {
//                     error(msg);
//                 } else {
//                     error(t('set_failed'));
//                 }
//             }
//         } catch (err) {
//             console.log(err);

//             error(t('set_failed'));
//         }
//     });

//     /**
//      * 详情
//      * @param {any} data 数据
//      */
//     const handleDetail = (data?: any): void => {
//         analytics.customEvent('Refferals_tab_link_unfold', {
//             desc: '点击向下展开数据内容',
//         });

//         if (!!data) {
//             ReferralAward.show(data);
//         }
//     };

//     return <div className="referral-channel">
//         <div className="channel-nums">
//             <p>
//                 <Trans t={t} i18nKey="links_nums" values={{ nums: `<strong>${channel.length}/${inviteLimit}</strong>` }} />
//             </p>
//             <button className="btn-create" onClick={handleCreate}>{t('btn_create_new')}</button>
//         </div>
//         {innerWidth > 768 && <ul className="channel-header">
//             <li>{t('links_create_time')}</li>
//             <li>{t('links_remark')}</li>
//             <li>{t('links_award_lut')}</li>
//             <li>{t('links_award_usdt')}</li>
//             <li>{t('invite_link')}</li>
//             <li>{t('links_invite_operation')}</li>
//             <li>&nbsp;</li>
//         </ul>
//         }
//         {innerWidth > 768 && channel.map((item: IGetInvitationChannelData, index) => (
//             <div className="channel-list" key={index}>
//                 <input type="checkbox" id={item.inviteCode} />
//                 <div className="channel-content">
//                     <ul className="channel-info">
//                         <li>{getLocaleTime(item.createTime)}</li>
//                         <li>
//                             <span>{item.name}</span>
//                             <button className="btn-edit" onClick={() => handleEdit(item.name, item.inviteCode)}>
//                                 <SVG src={assets.iconEdit} />
//                             </button>
//                         </li>
//                         <li>
//                             {item.totalLutPrize} LUT
//                         </li>
//                         <li>
//                             {item.totalRebate} USDT
//                         </li>
//                         <li>
//                             <span>{getInviteLink(item.inviteCode)}</span>
//                             <button className="btn-copy" onClick={() => handleCopy(getInviteLink(item.inviteCode))}>
//                                 <SVG src={assets.iconCopy} />
//                             </button>
//                         </li>
//                         <li><button className="btn-default" disabled={item.isDefault} onClick={() => handleDefault(item.inviteCode)}>{item.isDefault ? t('links_default') : t('links_set_default')}</button></li>
//                         <li>
//                             <label className="btn-toggle" htmlFor={item.inviteCode} onClick={() => handleDetail()}>
//                                 <SVG src={assets.iconArrow} />
//                             </label>
//                         </li>
//                     </ul>
//                     <div className="channel-detail">
//                         <table cellSpacing="0" cellPadding="0" width="100%">
//                             <thead>
//                                 <tr>
//                                     <th>{t('invite_friends')}</th>
//                                     <th>{t('bet_friends')}</th>
//                                     <th>{t('bet_amount')}</th>
//                                     <th>{t('links_award_lut')}</th>
//                                     <th>{t('links_award_usdt')}</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 <tr>
//                                     <td>{item.referralCount}</td>
//                                     <td>{item.referralBetCount}</td>
//                                     <td>{item.referralBetAmount} USDT</td>
//                                     <td>{item.totalLutPrize} LUT</td>
//                                     <td>{item.totalRebate} USDT</td>
//                                 </tr>
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//             </div>
//         ))}
//         {innerWidth <= 768 && channel.map((item: IGetInvitationChannelData, index) => (
//             <div className="channel-list_h5" key={index}>
//                 <div>
//                     <p>
//                         <span>{item.name}</span>
//                         <button className="btn-edit" onClick={() => handleEdit(item.name, item.inviteCode)}>
//                             <SVG src={assets.iconEdit} />
//                         </button>
//                     </p>
//                     <button className="btn-award" onClick={() => handleDetail(item)}>
//                         <SVG src={assets.iconArrow} />
//                     </button>
//                 </div>
//                 <dl>
//                     <dt>{t('links_create_time')}</dt>
//                     <dd>{getLocaleTime(item.createTime)}</dd>
//                 </dl>
//                 <dl>
//                     <dt>{t('links_award_lut')}</dt>
//                     <dd>{item.totalLutPrize} LUT</dd>
//                 </dl>
//                 <dl>
//                     <dt>{t('links_award_usdt')}</dt>
//                     <dd>{item.totalRebate} USDT</dd>
//                 </dl>
//                 <dl>
//                     <dt>{t('invite_link')}</dt>
//                     <dd>
//                         <span>{getInviteLink(item.inviteCode)}</span>
//                         <button className="btn-copy" onClick={() => handleCopy(getInviteLink(item.inviteCode))}>
//                             <SVG src={assets.iconCopy} />
//                         </button>
//                     </dd>
//                 </dl>
//                 <dl>
//                     <dt>{t('links_invite_operation')}</dt>
//                     <dd>
//                         <button className="btn-default" disabled={item.isDefault} onClick={() => handleDefault(item.inviteCode)}>{item.isDefault ? t('links_default') : t('links_set_default')}</button>
//                     </dd>
//                 </dl>
//             </div>
//         ))}
//     </div>;
// };

// export default ReferralChannel;
