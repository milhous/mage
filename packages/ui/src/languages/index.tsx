import {ChannelEventType} from '@libs/config';
import {BTGBroadcastChannel} from '@libs/broadcastChannel';
import {LangConfigs, getCurLang} from '@libs/i18n';
import {WidgetDropdown} from '@widget/index';

const channel = new BTGBroadcastChannel();

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
      type: ChannelEventType.LANGUAGES_CHANGE,
      payload: data,
    });
  };

  return <WidgetDropdown list={getLangsList()} selected={getCurLang()} onSelect={handleSelect} />;
};

export default UILanguages;
