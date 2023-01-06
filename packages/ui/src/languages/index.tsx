import {changeLang} from '@libs/mediator';
import {LangConfigs, getCurLang} from '@libs/i18n';
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
  const list = getLangsList();
  const selected = getCurLang();

  const handleSelect = (data: IWidgetDropdownList): void => {
    changeLang(data.val);
  };

  return <WidgetDropdown list={list} selected={selected} onSelect={handleSelect} />;
};

export default UILanguages;
