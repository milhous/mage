// import { useEffect, useState } from 'react';
// import { useTranslation } from 'react-i18next';
// import SVG from 'react-inlinesvg';

// import analytics from '@libs/analytics';
// import { useThrottle } from '@libs/utils/hooks';
// import SelectList from '@ui/SelectList';
// import { useWindowResize } from '@libs/utils/util';

// import i18n from '@/config/i18n';
// import { apiGetInvitationDetail, IGetInvitationDetailResponse, IGetInvitationListData } from '@/api';
// import { useInviteChannel } from '@/api/hook';
// import assets from '@/assets';

// import './ReferralDetail.less';

// const { hooks } = bitgame;

// // 根据时间戳获取本地时间
// const getLocaleTime = (timestamp: number): string => {
//     const date: Date = new Date(timestamp);
//     const time: string[] = date.toLocaleString('zh', { hour12: false }).split(' ');

//     return time[0];
// };

// // 邀请明细
// const ReferralDetail = (props: { visible: boolean }): JSX.Element => {
//     const { t } = useTranslation('referral', { i18n });
//     const { lang } = hooks.usePlatformState();
//     const { innerWidth } = useWindowResize();
//     const channel = useInviteChannel();

//     const [dataSource, setDataSource] = useState<any[]>([]);
//     const [selectName, setSelectName] = useState<string>('');
//     const [selectValue, setSelectValue] = useState<string>('');
//     // 总页数
//     const [total, setTotal] = useState<number>(0);
//     // 当前页数
//     const [pageNum, setPageNum] = useState<number>(0);
//     // 页数数组
//     const [pages, setPages] = useState<number[]>([]);
//     // 当前列表
//     const [list, setList] = useState<IGetInvitationListData[]>([]);
//     // 是否初始化
//     const [isInit, setInit] = useState<boolean>(false);

//     // 获取基本信息
//     const getInvitationDetail = async (pageNum: number, pageSize = 10, inviteCode = '') => {
//         const params: {
//             pageNum: number;
//             pageSize: number;
//             inviteCode?: string;
//         } = {
//             pageNum,
//             pageSize
//         };

//         if (inviteCode !== '' && inviteCode !== 'all') {
//             params.inviteCode = inviteCode;
//         }

//         const res: IGetInvitationDetailResponse = await apiGetInvitationDetail(params);
//         const { data } = res;

//         setTotal(data.pages);
//         setPageNum(data.pageNum);
//         setList(data.list);
//     };

//     // 翻页
//     const handlePages = useThrottle(async (data: number): Promise<void> => {
//         if (data < 0 || data > total) {
//             return;
//         }

//         getInvitationDetail(data, 10, selectValue);
//     }, 600);

//     useEffect(() => {
//         if (!isInit && props.visible) {
//             setInit(true);
//         }
//     }, [props.visible]);

//     useEffect(() => {
//         if (channel.length) {
//             const arr = [{
//                 label: t('detail_select_all'),
//                 value: 'all'
//             }];
//             let name = '';
//             let value = '';

//             for (const item of channel) {
//                 arr.push({
//                     label: item.name,
//                     value: item.inviteCode
//                 });
//             }

//             if (arr.length) {
//                 name = arr[0].label;
//                 value = arr[0].value;
//             }

//             setDataSource(arr);
//             setSelectName(name);
//             setSelectValue(value);
//         }
//     }, [channel, t]);

//     useEffect(() => {
//         if (selectValue !== '' && isInit) {
//             getInvitationDetail(1, 10, selectValue);
//         }
//     }, [selectValue, isInit]);

//     useEffect(() => {
//         const arr = [];

//         for (let i = 0; i < total; i++) {
//             arr.push(i + 1);
//         }

//         setPages(arr);
//     }, [total]);

//     return <div className="referral-detail">
//         <div className="detail-select">
//             <SelectList
//                 dataSource={dataSource}
//                 isMobile={innerWidth < 768}
//                 value={selectValue}
//                 onChange={(value: string, item: any) => {
//                     setSelectName(item.label);
//                     setSelectValue(item.value);
//                 }}
//                 onClick={() => {
//                     analytics.customEvent('Referrals_tab_detail_filter', {
//                         desc: '点击邀请明细中筛选下拉框',
//                     });
//                 }}
//             >
//                 <div className="select-name">
//                     <span>{selectName}</span>
//                     <SVG src={assets.iconArrow} />
//                </div>
//             </SelectList>
//         </div>
//         {innerWidth > 768 && <ul className="detail-header">
//             <li>
//                 <span>{t('detail_date')}</span>
//                 <span>{t('invite_link')}</span>
//                 <span>userid</span>
//                 <span>{t('detail_first_bet')}</span>
//                 <span>{t('detail_total_bet')}</span>
//             </li>
//         </ul>}
//         {innerWidth > 768 && <ul className="detail-list">
//             {list.map((item: IGetInvitationListData, index) => (
//                 <li key={index}>
//                     <span>{getLocaleTime(item.createTime)}</span>
//                     <span>{item.adName}</span>
//                     <span>{item.userId}</span>
//                     <span>{item.firstBetAmount} USDT</span>
//                     <span>{item.totalBetAmount} USDT</span>
//                 </li>
//             ))}
//             {list.length === 0 && <li className="no-data">{t('nodata')}</li>}
//         </ul>}
//         {innerWidth <= 768 && <div className="detail-list_h5">
//             {list.map((item: IGetInvitationListData, index) => (
//                 <div key={index}>
//                     <h3>{item.adName}</h3>
//                     <dl>
//                         <dt>{t('detail_date')}</dt>
//                         <dd>{getLocaleTime(item.createTime)}</dd>
//                     </dl>
//                     <dl>
//                         <dt>userid</dt>
//                         <dd>{item.userId}</dd>
//                     </dl>
//                     <dl>
//                         <dt>{t('detail_first_bet')}</dt>
//                         <dd>{item.firstBetAmount} USDT</dd>
//                     </dl>
//                     <dl>
//                         <dt>{t('detail_total_bet')}</dt>
//                         <dd>{item.totalBetAmount} USDT</dd>
//                     </dl>
//                 </div>
//             ))}
//             {list.length === 0 && <div className="no-data">{t('nodata')}</div>}
//         </div>}
//         <div className="detail-pages">
//             {total > 1 && <button className="btn-prev" onClick={() => handlePages(pageNum-1)}>
//                 <SVG src={assets.iconArrow} />
//             </button>}
//             <ul>
//                 {pages.map((item, index) => (
//                     <li key={index}>
//                         <button className="btn-pages" disabled={item === pageNum} onClick={() => handlePages(item)}>{item}</button>
//                     </li>
//                 ))}
//                 {pages.length === 0 && <li>
//                     <button className="btn-pages" disabled>1</button>
//                 </li>}
//             </ul>
//             {total > 1 && <button className="btn-next" onClick={() => handlePages(pageNum+1)}>
//                 <SVG src={assets.iconArrow} />
//             </button>}
//         </div>
//     </div>;
// };

// export default ReferralDetail;
