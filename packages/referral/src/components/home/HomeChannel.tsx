import {Trans} from 'react-i18next';

import {useTranslate} from '@libs/i18n';
import {throttle, copy} from '@libs/utils';
import analytics from '@libs/analytics';
import {toast, error} from '@widget/toastify';

import {ReferralEventType} from '@app/types';
import {OK_CODE, IGetInvitationChannelData} from '@app/api';
import {useInviteBasics, useInviteChannel} from '@app/hooks';

// import * as referralCreate from './ReferralCreate';
// import * as referralEdit from './ReferralEdit';
// import * as ReferralAward from './ReferralAward';
import './HomeChannel.less';
import Assets from '@app/assets';

// 根据时间戳获取本地时间
const getLocaleTime = (timestamp: number): string => {
  const date: Date = new Date(timestamp);
  const time: string[] = date.toLocaleString('zh', {hour12: false}).split(' ');

  return time[0];
};

// 获取邀请链接
const getInviteLink = (code: string): string => {
  return `${location.origin}/?invite=${code}`;
};

// 复制
const handleCopy = (str: string): void => {
  analytics.customEvent('Referral_link_copy', {
    desc: '点击邀请链接复制按钮',
  });

  copy(str);

  // toast(langInfo.copy_success);
};

// 设置默认
const handleDefault = throttle(async (data: string): Promise<void> => {
  // try {
  //   const res: any = await apiGetInvitationDefault({
  //     inviteCode: data,
  //   });
  //   const code = res.rspCode;
  //   if (code === OK_CODE) {
  //     toast(t('set_succeed'));
  //     window.dispatchEvent(new CustomEvent(ReferralEventType.GET_CHANNEL));
  //   } else {
  //     const msg: string = i18n.t('error:error_' + code);
  //     if (msg) {
  //       error(msg);
  //     } else {
  //       error(t('set_failed'));
  //     }
  //   }
  // } catch (err) {
  //   console.log(err);
  //   error(t('set_failed'));
  // }
});

/**
 * 修改
 * @param {string} remark 备注
 * @param {string} code 邀请码
 */
const handleEdit = (remark: string, code: string): void => {
  analytics.customEvent('Refferals_tab_link_Edit_note', {
    desc: '点击修改备注按钮',
  });

  // referralEdit.show({
  //   remark,
  //   code,
  // });
};

/**
 * 详情
 * @param {any} data 数据
 */
const handleDetail = (data?: any): void => {
  analytics.customEvent('Refferals_tab_link_unfold', {
    desc: '点击向下展开数据内容',
  });

  if (!!data) {
    // ReferralAward.show(data);
  }
};

/**
 * 邀请列表（PC）
 * @param {IGetInvitationChannelData} props.data 数据
 * @param {number} props.index 索引值
 */
const ElemHomeChannelList = (props: {data: IGetInvitationChannelData; index: number}): JSX.Element => {
  const {data, index} = props;
  const {
    name,
    inviteCode,
    createTime,
    isDefault,
    totalLutPrize,
    totalRebate,
    referralCount,
    referralBetCount,
    referralBetAmount,
  } = data;
  const t = useTranslate(['referral', 'error']);

  return (
    <div className="channel-list" key={index}>
      <input type="checkbox" id={inviteCode} />
      <div className="channel-content">
        <ul className="channel-info">
          <li>{getLocaleTime(createTime)}</li>
          <li>
            <span>{name}</span>
            <button className="btn-edit" onClick={() => handleEdit(name, inviteCode)}>
              <Assets.HomeIconEdit />
            </button>
          </li>
          <li>{totalLutPrize} LUT</li>
          <li>{totalRebate} USDT</li>
          <li>
            <span>{getInviteLink(inviteCode)}</span>
            <button className="btn-copy" onClick={() => handleCopy(getInviteLink(inviteCode))}>
              <Assets.HomeIconCopy />
            </button>
          </li>
          <li>
            <button className="btn-default" disabled={isDefault} onClick={() => handleDefault(inviteCode)}>
              {isDefault ? t('links_default') : t('links_set_default')}
            </button>
          </li>
          <li>
            <label className="btn-toggle" htmlFor={inviteCode} onClick={() => handleDetail()}>
              <Assets.HomeIconArrow />
            </label>
          </li>
        </ul>
        <div className="channel-detail">
          <table cellSpacing="0" cellPadding="0" width="100%">
            <thead>
              <tr>
                <th>{t('invite_friends')}</th>
                <th>{t('bet_friends')}</th>
                <th>{t('bet_amount')}</th>
                <th>{t('links_award_lut')}</th>
                <th>{t('links_award_usdt')}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{referralCount}</td>
                <td>{referralBetCount}</td>
                <td>{referralBetAmount} USDT</td>
                <td>{totalLutPrize} LUT</td>
                <td>{totalRebate} USDT</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

/**
 * 邀请列表（H5）
 * @param {IGetInvitationChannelData} props.data 数据
 * @param {number} props.index 索引值
 */
const ElemHomeChannelListH5 = (props: {data: IGetInvitationChannelData; index: number}): JSX.Element => {
  const {data, index} = props;
  const {name, inviteCode, createTime, isDefault, totalLutPrize, totalRebate} = data;
  const t = useTranslate(['referral', 'error']);

  return (
    <div className="channel-list_h5" key={index}>
      <div>
        <p>
          <span>{name}</span>
          <button className="btn-edit" onClick={() => handleEdit(name, inviteCode)}>
            <Assets.HomeIconEdit />
          </button>
        </p>
        <button className="btn-award" onClick={() => handleDetail(data)}>
          <Assets.HomeIconArrow />
        </button>
      </div>
      <dl>
        <dt>{t('links_create_time')}</dt>
        <dd>{getLocaleTime(createTime)}</dd>
      </dl>
      <dl>
        <dt>{t('links_award_lut')}</dt>
        <dd>{totalLutPrize} LUT</dd>
      </dl>
      <dl>
        <dt>{t('links_award_usdt')}</dt>
        <dd>{totalRebate} USDT</dd>
      </dl>
      <dl>
        <dt>{t('invite_link')}</dt>
        <dd>
          <span>{getInviteLink(inviteCode)}</span>
          <button className="btn-copy" onClick={() => handleCopy(getInviteLink(inviteCode))}>
            <Assets.HomeIconCopy />
          </button>
        </dd>
      </dl>
      <dl>
        <dt>{t('links_invite_operation')}</dt>
        <dd>
          <button className="btn-default" disabled={isDefault} onClick={() => handleDefault(inviteCode)}>
            {isDefault ? t('links_default') : t('links_set_default')}
          </button>
        </dd>
      </dl>
    </div>
  );
};

// 邀请链接
const HomeChannel = (): JSX.Element => {
  const t = useTranslate(['referral', 'error']);
  const {inviteLimit} = useInviteBasics();
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

  return (
    <div className="referral-channel">
      <div className="channel-nums">
        <p>
          <Trans t={t} i18nKey="links_nums" values={{nums: `<strong>${channel.length}/${inviteLimit}</strong>`}} />
        </p>
        <button className="btn-create" onClick={handleCreate}>
          {t('btn_create_new')}
        </button>
      </div>
      <ul className="channel-header">
        <li>{t('links_create_time')}</li>
        <li>{t('links_remark')}</li>
        <li>{t('links_award_lut')}</li>
        <li>{t('links_award_usdt')}</li>
        <li>{t('invite_link')}</li>
        <li>{t('links_invite_operation')}</li>
        <li>&nbsp;</li>
      </ul>
      {channel.map((item: IGetInvitationChannelData, index) => (
        <>
          <ElemHomeChannelList data={item} index={index} key={index} />
          <ElemHomeChannelListH5 data={item} index={index} key={index} />
        </>
      ))}
    </div>
  );
};

export default HomeChannel;
