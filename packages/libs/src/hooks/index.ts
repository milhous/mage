import {useState, useEffect, useRef, useCallback} from 'react';

/**
 * 定时器
 * @param {function} cb 回调函数
 * @param {number} delay 延迟时间（毫秒）
 */
export const useInterval = (cb: () => void, delay: number) => {
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
export const useThrottle = (fn: any, delay = 3000, dep: any[] = []) => {
  const {current} = useRef<{fn: any; timer: number | null}>({fn, timer: null});

  useEffect(() => {
    current.fn = fn;
  }, [fn]);

  return useCallback(function f(...args: any[]) {
    if (!current.timer) {
      current.timer = window.setTimeout(() => {
        current.timer = null;
      }, delay);

      current.fn(...args);
    }
  }, dep);
};

// 防抖
export const useDebounce = (fn: any, delay = 3000, dep: any[] = []) => {
  const {current} = useRef<{fn: any; timer: number | null}>({fn, timer: null});

  useEffect(() => {
    current.fn = fn;
  }, [fn]);

  return useCallback(function f(...args: any[]) {
    if (!!current.timer) {
      clearTimeout(current.timer);
    }

    current.timer = window.setTimeout(() => {
      current.fn(...args);
    }, delay);
  }, dep);
};
