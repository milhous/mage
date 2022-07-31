import {useEffect, useState} from 'react';

import {changeTimezone} from '@libs/mediator';
import {useTranslate, getTranslate} from '@libs/i18n';
import {TimeZoneConfigs, useTimezone} from '@libs/timezone';
import {WidgetDropdown} from '@widget/index';

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
    changeTimezone(data.val);
  };

  useEffect(() => {
    const timezonesList = getTimezonesList();

    setList(timezonesList);
  }, [t]);

  return <WidgetDropdown list={list} selected={selected} showTips={true} onSelect={handleSelect} />;
};

export default UITimezone;
