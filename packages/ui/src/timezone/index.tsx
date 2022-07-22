import {ChannelEventType} from '@libs/types';
import {useTranslate, getTranslate} from '@libs/i18n';
import {BTGBroadcastChannel} from '@libs/broadcastChannel';
import {TimeZoneConfigs, getCurTimezone} from '@libs/timezone';
import WidgetDropdown, {IWidgetDropdownList} from '@widget/dropdown';
import {useEffect, useState} from 'react';

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
  const [selected, setSelected] = useState<string>(getCurTimezone());
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

  return <WidgetDropdown list={list} selected={selected} onSelect={handleSelect} />;
};

export default UITimezone;
