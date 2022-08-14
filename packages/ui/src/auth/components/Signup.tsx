import {Trans} from 'react-i18next';

import {ModalType} from '@libs/config';
import {useTranslate} from '@libs/i18n';
import {useModal, showModal} from '@libs/modal';

import WidgetModal from '@widget/modal';

import SignUpForm from './SignUpForm';
import OAuthLogin from './OAuthLogin';
import Promotion from './Promotion';
import ButtonClose from './ButtonClose';

import './Signup.less';

// 引导登录
const GuideLogin = (): JSX.Element => {
  const t = useTranslate(['auth']);

  const onLogin = (evt: React.MouseEvent) => {
    evt.preventDefault();

    showModal(ModalType.LOGIN);
  };

  return (
    <p className="ui-auth_guide">
      {t('has_account')}
      <span onClick={onLogin}>{t('login_submit')}</span>
    </p>
  );
};

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
              <h3>
                <Trans
                  t={t}
                  i18nKey="tips_title"
                  values={{
                    amount: `<span>10000 BUSDT</span>`,
                  }}
                />
              </h3>
              <SignUpForm visible={visible} />
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
