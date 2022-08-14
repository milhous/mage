import {useState, useEffect, useRef, useCallback} from 'react';

/**
 * 定时器
 * @param {function} cb 回调函数
 * @param {number} delay 延迟时间（毫秒）
 */
export const useInterval = (cb: () => void, delay: number | null) => {
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
};

// 节流
export const useThrottle = <F extends (...args: any[]) => any>(func: F, delay = 3000, dep: any[] = []) => {
  const {current} = useRef<{func: F; timer: number | null}>({func, timer: null});

  useEffect(() => {
    current.func = func;
  }, [func]);

  return useCallback(function f(...args: any[]) {
    if (!current.timer) {
      current.timer = setTimeout(() => {
        current.timer = null;
      }, delay);

      current.func(...args);
    }
  }, dep);
};

// 防抖
export const useDebounce = <F extends (...args: any[]) => any>(func: F, delay = 300, dep: any[] = []) => {
  const {current} = useRef<{func: F; timer: number | null}>({func, timer: null});

  useEffect(() => {
    current.func = func;
  }, [func]);

  return useCallback(function f(...args: any[]) {
    if (!!current.timer) {
      clearTimeout(current.timer);
    }

    current.timer = setTimeout(() => {
      current.func(...args);
    }, delay);
  }, dep);
};

export const useWindowResize = () => {
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [innerHeight, setInnerHeight] = useState(window.innerHeight);

  const updateWidthAndHeight = useThrottle(() => {
    setInnerWidth(window.innerWidth);
    setInnerHeight(window.innerHeight);
  }, 250);

  useEffect(() => {
    window.addEventListener('resize', updateWidthAndHeight);

    return () => window.removeEventListener('resize', updateWidthAndHeight);
  }, []);

  return {innerWidth, innerHeight};
};
