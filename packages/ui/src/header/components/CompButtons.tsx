import {useState} from 'react';

import {ModalType} from '@libs/config';
import {useTranslate} from '@libs/i18n';
import {showModal} from '@libs/mediator';

import './CompButtons.less';

// 按钮
const CompButtons = (): JSX.Element => {
  const t = useTranslate(['header']);

  const handleLogin = (): void => {
    showModal(ModalType.LOGIN);
  };

  const handleSignup = (): void => {
    showModal(ModalType.SIGN_UP);
  };

  return (
    <div className="ui-header_btns">
      <button className="header-btns_login" onClick={handleLogin}>
        {t('btn_login')}
      </button>
      <button className="header-btns_signup" onClick={handleSignup}>
        {t('btn_signup')}
      </button>
    </div>
  );
};

export default CompButtons;
