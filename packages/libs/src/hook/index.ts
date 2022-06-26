import {useEffect, useRef} from 'react';

/**
 * 定时器
 * @param {function} cb 回调函数
 * @param {number} delay 延迟时间（毫秒）
 */
export function useInterval(cb: () => void, delay: number) {
  const savedCallback = useRef<() => void>();

  useEffect(() => {
    savedCallback.current = cb;
  }, [cb]);

  useEffect(() => {
    function tick() {
      if (typeof savedCallback.current === 'function') {
        savedCallback.current();
      }
    }

    if (delay !== null) {
      const id = setInterval(tick, delay);

      return () => clearInterval(id);
    }
  }, [delay]);
}
