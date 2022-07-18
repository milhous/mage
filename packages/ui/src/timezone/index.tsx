import {useTranslate} from '@libs/i18n';
import {TimeZoneConfigs, getTimeZone} from '@libs/timezone';
import {WidgetDropdown} from '@widget/index';

// 获取时区列表
// const useTimezoneList = () => {
//   const list = [];

//   for (const key in TimeZoneConfigs) {
//     // list.push({
//     //   val: lang,
//     //   desc: alias,
//     // });
//   }

//   return list;
// };

console.log(TimeZoneConfigs, getTimeZone());

// Timezone
const UITimezone = (): JSX.Element => {
  const t = useTranslate(['timezone']);

  return <div></div>;
};

export default UITimezone;
