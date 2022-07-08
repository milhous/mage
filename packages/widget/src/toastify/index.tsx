import React from 'react';
import ReactDOM from 'react-dom/client';
import * as toastify from 'react-toastify';

// import { isMobile } from '@libs/utils/util';

import IconTips from './icon-tips.svg';
import './index.less';
import 'react-toastify/dist/ReactToastify.css';

// 默认配置
const defaultOptions = {
  //position: isMobile() ? 'top-center' : 'top-right',
  position: false ? 'top-center' : 'top-right',
  autoClose: 3000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  pauseOnFocusLoss: false,
  draggable: true,
  progress: undefined,
  className: 'btg-toastify',
  containerId: 'Toastify',
};

let isInit = false;

// 初始化
const init = (): void => {
  if (isInit) {
    return;
  }

  isInit = true;

  const div = document.createElement('div');
  document.body.appendChild(div);

  const root = ReactDOM.createRoot(div as HTMLElement);

  root.render(<toastify.ToastContainer containerId="Toastify" />);
};

interface IContentProps {
  children?: React.ReactNode | React.ReactNode[];
}

// 内容
const Content = (props: IContentProps): JSX.Element => {
  return (
    <div className="btg-toastify_content">
      <IconTips />
      <p>{props.children}</p>
    </div>
  );
};

const ContentShare = (props: IContentProps): JSX.Element => {
  return <>{props.children}</>;
};

export const toast = (str: any, options: any = {}): void => {
  const opts = Object.assign({}, defaultOptions, options);

  init();

  toastify.toast(<Content>{str}</Content>, opts);
};

export const error = (str: any, options: any = {}): void => {
  const opts = Object.assign({}, defaultOptions, options);

  opts.className = opts.className + ' btg-toastify_error';

  init();

  toastify.toast(<Content>{str}</Content>, opts);
};

export const toastShare = (str: any, options: any = {}): void => {
  const opts = Object.assign({}, defaultOptions, options);

  init();

  toastify.toast(<ContentShare>{str}</ContentShare>, opts);
};
