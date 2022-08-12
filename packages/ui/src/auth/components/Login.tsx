import {ModalType} from '@libs/config';
import {useTranslate} from '@libs/i18n';
import {useModal, showModal} from '@libs/modal';

import WidgetModal from '@widget/modal';

import LoginForm from './LoginForm';
import OAuthLogin from './OAuthLogin';
import Promotion from './Promotion';
import ButtonClose from './ButtonClose';

import './Login.less';

// 引导注册
const GuideSignUp = (): JSX.Element => {
  const t = useTranslate(['auth']);
  const onSignUp = (evt: React.MouseEvent) => {
    evt.preventDefault();

    showModal(ModalType.SIGN_UP);
  };

  return (
    <p className="ui-auth_guide">
      {t('noaccount')}
      <span onClick={onSignUp}>{t('register_now')}</span>
    </p>
  );
};

// 登录
const Login = (): JSX.Element => {
  const t = useTranslate(['auth']);
  const {visible, setVisible, data} = useModal(ModalType.LOGIN);

  const handleClose = () => {
    setVisible(false);
  };

  return (
    <WidgetModal isActive={visible} onClose={handleClose}>
      <div className="ui-auth ui-auth_login">
        <div className="ui-auth_content">
          <aside>
            <Promotion />
          </aside>
          <article>
            <section>
              <h2>{t('title_login')}</h2>
              <LoginForm visible={!!visible} />
              <GuideSignUp />
              <OAuthLogin type="login" />
              {/* <WalletsLogin visible={!!visible} /> */}
            </section>
          </article>
        </div>
        <ButtonClose id="login_closed" onClose={handleClose} />
      </div>
    </WidgetModal>
  );
};

export default Login;
