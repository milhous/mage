import {BTGBroadcastChannel} from '@libs/broadcastChannel';
import {LangConfigs, getSupportedLangs, getCurLang} from '@libs/i18n';
import WidgetDropdown, {IWidgetDropdownList} from '@widget/dropdown';

const channel = new BTGBroadcastChannel('channelTest');

// 获取语言列表
const getLangsList = () => {
  const list = [];

  for (const {lang, alias} of LangConfigs) {
    list.push({
      val: lang,
      desc: alias,
    });
  }

  return list;
};

// footer
const UILanguages = (): JSX.Element => {
  const handleSelect = (data: IWidgetDropdownList): void => {
    channel.postMessage({
      type: 'test',
      payload: data,
    });
  };

  return <WidgetDropdown list={getLangsList()} selected={getCurLang()} onSelect={handleSelect} />;
};

export default UILanguages;
