import {Link, NavLink} from 'react-router-dom';

import {useTranslate} from '@libs/i18n';

import routers from '../routers';

import './CompNav.less';

// 导航
const CompNav = (): JSX.Element => {
  const t = useTranslate(['common']);

  return <nav className="ui-footer_nav">1111</nav>;
};

export default CompNav;
