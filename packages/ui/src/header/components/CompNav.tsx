import {NavLink} from 'react-router-dom';

import {useTranslate} from '@libs/i18n';

import routers from '../routers';

import './CompNav.less';

/**
 * 声明 - Link
 * @property {string} name 名称（i18n）
 * @property {string} to 跳转地址
 * @property {string} key 关键词（analytics）
 * @property {string} desc 描述（analytics）
 * @property {string} isHide 是否隐藏
 */
interface IHeaderLink {
  name: string;
  to: string;
  key: string;
  desc: string;
  isHide?: boolean;
}

/**
 * 声明 - Route
 * @property {Array<IHeaderLink>} children 子路由
 */
interface IHeaderRoute extends IHeaderLink {
  children?: IHeaderLink[];
}

//
const CompNavItem = (props: {route: IHeaderRoute}): JSX.Element => {
  const {route} = props;
  const t = useTranslate(['common']);

  return (
    <div className="header-nav_item">
      <NavLink
        to={route.to}
        className={({isActive}) => (isActive ? 'header-nav_link active' : 'header-nav_link')}
        // onClick={e => onClick(e, isLogin, link.to, link.key, link.desc)}
      >
        {t(route.name)}
      </NavLink>
    </div>
  );
};

// 导航
const CompNav = (): JSX.Element => {
  const betType = 0;
  const headerRouters = routers[betType];

  console.log(headerRouters);

  return (
    <nav className="ui-header_nav">
      {headerRouters.map((route, index) => (
        <CompNavItem key={index} route={route} />
      ))}
    </nav>
  );
};

export default CompNav;
