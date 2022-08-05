import React, {forwardRef} from 'react';

import './index.less';
import IconLoading from './icon-loading.svg';
import IconSuccess from './icon-success.svg';

/**
 * 声明
 * @param {boolean} state 状态类型
 * @param {number} styleMode 样式
 * @param {string} className 类名
 * @param {React.ReactNode} children ReactNode
 * @param {"button" | "submit" | "reset" | undefined} type 按钮类型
 */
interface IButtonLoadingProps {
  state?: number;
  styleMode?: number;
  className?: string;
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset' | undefined;
}

/**
 * 按钮状态
 * @property DEFAULT 默认
 * @property LOADING 加载
 * @property DISABLE 禁用
 * @property SUCCESS 成功
 */
export const ButtonLoadingState = {
  DEFAULT: 0,
  LOADING: 1,
  DISABLE: 2,
  SUCCESS: 3,
};

/**
 * 获取类名
 * @param {string} name 类名
 * @param {number} mode 样式模式
 * @param {number} state 按钮状态
 */
const getClassName = (name: string, mode: number, state: number) => {
  let classname = `widget-buttonLoading widget-buttonLoading_mode${mode}`;

  if (name !== '') {
    classname += name;
  }

  switch (state) {
    case ButtonLoadingState.DEFAULT:
      classname += ' widget-buttonLoading_default';

      break;
    case ButtonLoadingState.LOADING:
      classname += ' widget-buttonLoading_loading';

      break;
    case ButtonLoadingState.DISABLE:
      classname += ' widget-buttonLoading_disable';

      break;
    case ButtonLoadingState.SUCCESS:
      classname += ' widget-buttonLoading_success';

      break;
  }

  return classname;
};

// 加载按钮
const ButtonLoading = forwardRef((props: IButtonLoadingProps, ref: any): JSX.Element => {
  const {styleMode = 1, type = undefined, className = '', state = ButtonLoadingState.DEFAULT} = props;
  const name = getClassName(className, styleMode, state);

  return (
    <button ref={ref} className={name} type={type} disabled={state !== ButtonLoadingState.DEFAULT}>
      <span>{props.children}</span>
      <i className="loading">
        <IconLoading />
      </i>
      <i className="success">
        <IconSuccess />
      </i>
    </button>
  );
});

ButtonLoading.displayName = 'ButtonLoading';

export default ButtonLoading;
