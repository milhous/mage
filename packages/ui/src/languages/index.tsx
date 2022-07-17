import {LangConfigs, getSupportedLangs, getCurLang} from '@libs/i18n';
import {WidgetDropdown} from '@widget/index';

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
  return <WidgetDropdown list={getLangsList()} selected={getCurLang()} />;
};

export default UILanguages;
