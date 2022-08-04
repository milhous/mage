import {useState, useEffect, useMemo} from 'react';

import {ModalType} from '@libs/config';
import {useTranslate} from '@libs/i18n';
import {useModal} from '@libs/modal';

import WidgetModal from '@widget/modal';

import Promotion from './Promotion';

import './Login.less';

// 登录
const Login = (): JSX.Element => {
  const t = useTranslate(['auth']);
  const {visible, setVisible, data} = useModal(ModalType.LOGIN);

  return (
    <WidgetModal
      isActive={visible}
      onClose={() => {
        setVisible(false);
      }}
    >
      <div className="ui-auth ui-auth_login">
        <div className="ui-auth_content">
          <aside>
            <Promotion />
          </aside>
          <article>
            <section>
              <h2>{t('title_login')}</h2>
              {/* <LoginForm visible={!!visible} langConfig={langConfig} />
              <GuideSignUp />
              <OAuthLogin type="login" /> */}
              {/* <WalletsLogin visible={!!visible} /> */}
            </section>
          </article>
        </div>
        {/* {btnClose !== undefined ? btnClose : <BtnClose id="login_closed" />} */}
      </div>
    </WidgetModal>
  );
};

export default Login;
