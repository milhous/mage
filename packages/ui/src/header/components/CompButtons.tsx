import {useTranslate} from '@libs/i18n';

import './CompButtons.less';

// 按钮
const CompButtons = (): JSX.Element => {
  const t = useTranslate(['header']);

  return (
    <div className="ui-header_btns">
      <button className="header-btns_login">{t('btn_login')}</button>
      <button className="header-btns_register">{t('btn_register')}</button>
    </div>
  );
};

export default CompButtons;
