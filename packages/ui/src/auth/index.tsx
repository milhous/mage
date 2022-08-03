import {useState, useEffect} from 'react';

import WidgetModal from '@widget/modal';

import './index.less';

// Auth
const UIAuth = (): JSX.Element => {
  const [showLogin, setShowLogin] = useState<boolean>(false);
  const [showRegister, setShowRegister] = useState<boolean>(false);

  const handleRegister = (): void => {
    setShowRegister(true);
  };

  useEffect(() => {
    const onAuth: EventListener = ({detail}: any) => {
      console.log(2222);

      switch (detail) {
        case 0:
          setShowLogin(true);

          break;
        case 1:
          setShowRegister(true);

          break;
      }
    };

    window.addEventListener('login', onAuth);

    return () => window.removeEventListener('login', onAuth);
  }, []);

  return (
    <div className="ui-auth">
      <WidgetModal
        isActive={showLogin}
        onClose={() => {
          setShowLogin(false);
        }}
      >
        <div>Login</div>
        <button onClick={handleRegister}>click</button>
      </WidgetModal>
      <WidgetModal
        isActive={showRegister}
        onClose={() => {
          setShowRegister(false);
        }}
      >
        <div>Register</div>
      </WidgetModal>
    </div>
  );
};

export default UIAuth;
