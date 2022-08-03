import {Suspense, lazy} from 'react';

import '@libs/mediator';
import loadComponent from '@libs/loadComponent';
import WidgetSpinner from '@widget/spinner';

/**
 * 声明
 * @property {string} remote 远程
 * @property {string} url 地址
 * @property {string} module 模块
 */
interface IWidgetSystemInfo {
  remote: string;
  url: string;
  module: string;
}

/**
 * 系统
 * @param {ISystemInfo} props.system 信息
 * @param {number} props.type 类型
 */
const WidgetSystem = (props: {info: IWidgetSystemInfo; type?: number}): JSX.Element => {
  const {info, type} = props;
  const {remote, module, url} = info;

  const Component = lazy(loadComponent(remote, 'default', module, url));

  return (
    <Suspense fallback={<WidgetSpinner />}>
      <Component type={type} />
    </Suspense>
  );
};

export default WidgetSystem;
