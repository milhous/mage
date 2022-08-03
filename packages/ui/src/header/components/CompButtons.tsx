import {useState} from 'react';

import {useTranslate} from '@libs/i18n';
import WidgetModal from '@widget/modal';

import './CompButtons.less';

// 按钮
const CompButtons = (): JSX.Element => {
  const t = useTranslate(['header']);

  const handleLogin = (): void => {
    window.dispatchEvent(new CustomEvent('login', {detail: 0}));
  };

  const handleRegister = (): void => {
    window.dispatchEvent(new CustomEvent('login', {detail: 1}));
  };

  return (
    <div className="ui-header_btns">
      <button className="header-btns_login" onClick={handleLogin}>
        {t('btn_login')}
      </button>
      <button className="header-btns_register" onClick={handleRegister}>
        {t('btn_register')}
      </button>
    </div>
  );
};

export default CompButtons;
