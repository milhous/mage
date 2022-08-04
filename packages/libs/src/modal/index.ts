import {useState, useEffect} from 'react';

import {CustomEventType} from '../config';

/**
 * 切换弹层
 * @param {number} type 类型
 * @param {string} data 数据
 */
export const changeModal = (type: number, data?: any): void => {
  const detail = {
    type,
    data,
  };

  window.dispatchEvent(new CustomEvent(CustomEventType.MODAL_CHANGE, {detail}));
};

// Hook - 弹层
export const useModal = (): {type: number; data: any} => {
  const [type, setType] = useState<number>(0);
  const [data, setData] = useState<any>();

  useEffect(() => {
    const onModal: EventListener = ({detail}: any) => {
      setType(detail.type);
      setData(detail.data);
    };

    window.addEventListener(CustomEventType.MODAL_CHANGE, onModal);

    return () => window.removeEventListener(CustomEventType.MODAL_CHANGE, onModal);
  }, []);

  return {
    type,
    data,
  };
};
