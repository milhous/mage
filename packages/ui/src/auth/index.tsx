import {useTranslate} from '@libs/i18n';

import Login from './components/Login';
import Signup from './components/Signup';

import './index.less';

// Auth
const UIAuth = (): JSX.Element => {
  const t = useTranslate(['auth', 'error']);

  return (
    <div className="ui-auth">
      <Login />
      <Signup />
    </div>
  );
};

export default UIAuth;
