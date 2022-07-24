import {useEffect, useState} from 'react';

import {ChannelEventType} from '@libs/config';
import {useTranslate, getTranslate} from '@libs/i18n';
import {BTGBroadcastChannel} from '@libs/broadcastChannel';
import {TimeZoneConfigs, getCurTimezone, useTimezone} from '@libs/timezone';
import {WidgetDropdown} from '@widget/index';

const channel = new BTGBroadcastChannel();

// 获取时区列表
const getTimezonesList = (): IWidgetDropdownList[] => {
  const list = [];

  for (const key in TimeZoneConfigs) {
    const desc = getTranslate(`timezone@${key}`, '@');

    list.push({
      val: key,
      desc,
    });
  }

  return list;
};

// Timezone
const UITimezone = (): JSX.Element => {
  const t = useTranslate(['timezone']);
  const selected = useTimezone();
  const [list, setList] = useState<IWidgetDropdownList[]>([]);

  // 选择
  const handleSelect = (data: IWidgetDropdownList): void => {
    channel.postMessage({
      type: ChannelEventType.TIMEZONE_CHANGE,
      payload: data,
    });
  };

  useEffect(() => {
    const timezonesList = getTimezonesList();

    setList(timezonesList);
  }, [t]);

  return <WidgetDropdown list={list} selected={selected} showTips={true} onSelect={handleSelect} />;
};

export default UITimezone;
