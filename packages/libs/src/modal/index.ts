import {useState, useEffect, Dispatch, SetStateAction} from 'react';

import {CustomEventType, ModalType} from '../config';

/**
 * 显示弹层
 * @param {number} type 类型
 * @param {string} data 数据
 */
export const showModal = (type: number, data?: any): void => {
  const detail = {
    type,
    data,
  };

  window.dispatchEvent(new CustomEvent(CustomEventType.MODAL_SHOW, {detail}));
};

/**
 * 关闭弹层
 * @param {number} type 类型
 */
export const closeModal = (type: number): void => {
  const detail = {
    type,
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
      if (targetType === detail.type) {
        setVisible(true);
        setData(detail.data);
      }
    };

    const onClose: EventListener = ({detail}: any) => {
      if (targetType === detail.type || ModalType.NONE === detail.type) {
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
