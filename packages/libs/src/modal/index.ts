import {useState, useEffect, Dispatch, SetStateAction} from 'react';

import {CustomEventType, ModalType} from '../config';

/**
 * 声明 - 显示弹层数据
 * @property {number} type 类型
 * @property {string} data 数据
 * @property {boolean} isOnly 是否唯一存在(默认true)
 */
interface IModalShowData {
  type: number;
  data?: any;
  isOnly?: boolean;
}

/**
 * 声明 - 关闭弹层数据
 * @property {number} type 类型
 * @property {boolean} isAll 是否关闭所有(默认false)
 */
interface IModalCloseData {
  type: number;
  isAll?: boolean;
}

/**
 * 显示弹层
 * @param {number} type 类型
 * @param {string} data 数据
 * @param {boolean} isOnly 是否唯一存在
 */
export const showModal = (type: number, data?: any, isOnly = true): void => {
  const detail: IModalShowData = {
    type,
    data,
    isOnly,
  };

  window.dispatchEvent(new CustomEvent(CustomEventType.MODAL_SHOW, {detail}));
};

/**
 * 关闭弹层
 * @param {number} type 类型
 * @param {boolean} isAll 是否关闭所有
 */
export const closeModal = (type: number, isAll = false): void => {
  const detail: IModalCloseData = {
    type,
    isAll,
  };

  window.dispatchEvent(new CustomEvent(CustomEventType.MODAL_CLOSE, {detail}));
};

/**
 * hook - 弹层
 * @param {number} targetType 当前弹层类型
 */
export const useModal = (
  targetType: number,
): {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  data: any;
} => {
  const [visible, setVisible] = useState<boolean>(false);
  const [data, setData] = useState<any>();

  useEffect(() => {
    const onShow: EventListener = ({detail}: any) => {
      const {type, isOnly} = detail as IModalShowData;

      if (isOnly && targetType !== type) {
        setVisible(false);
      } else if (targetType === type) {
        setVisible(true);
        setData(detail.data);
      }
    };

    const onClose: EventListener = ({detail}: any) => {
      const {type, isAll} = detail as IModalCloseData;

      if (isAll || targetType === type || ModalType.NONE === type) {
        setVisible(false);
      }
    };

    window.addEventListener(CustomEventType.MODAL_SHOW, onShow);
    window.addEventListener(CustomEventType.MODAL_CLOSE, onClose);

    return () => {
      window.removeEventListener(CustomEventType.MODAL_SHOW, onShow);
      window.removeEventListener(CustomEventType.MODAL_CLOSE, onClose);
    };
  }, []);

  return {
    visible,
    setVisible,
    data,
  };
};
