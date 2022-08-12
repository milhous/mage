import {useState, useEffect, useMemo} from 'react';
import {Trans} from 'react-i18next';

import {ModalType} from '@libs/config';
import {useTranslate} from '@libs/i18n';
import {useModal, showModal} from '@libs/modal';

import WidgetModal from '@widget/modal';

import OAuthLogin from './OAuthLogin';
import Promotion from './Promotion';
import ButtonClose from './ButtonClose';

import './Signup.less';

// 注册
const Signup = (): JSX.Element => {
  const t = useTranslate(['auth']);
  const {visible, setVisible, data} = useModal(ModalType.SIGN_UP);

  const handleClose = () => {
    setVisible(false);
  };

  return (
    <WidgetModal isActive={visible} onClose={handleClose}>
      <div className="ui-auth ui-auth_signup">
        <div className="ui-auth_content">
          <aside>
            <Promotion />
          </aside>
          <article>
            <section>
              <h2>{t('title_register')}</h2>
              <LoginForm visible={!!visible} />
              <GuideSignUp />
              <OAuthLogin type="login" />
              <h3>
                {tips[0]}
                <span>10000 BUSDT</span>
                {!!tips[1] ? tips[1] : ''}
              </h3>
              {/* <SignUpForm visible={visible} /> */}
              <GuideLogin />
              <OAuthLogin type="signup" />
              {/* <WalletsLogin visible={!!visible} /> */}
            </section>
          </article>
        </div>
        <ButtonClose id="login_closed" onClose={handleClose} />
      </div>
    </WidgetModal>
  );
};

export default Signup;
