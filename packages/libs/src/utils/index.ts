// 节流
export const throttle = <F extends (...args: any[]) => any>(func: F, delay = 3000) => {
  let timer: number | null;

  return function (this: ThisParameterType<F>, ...args: Parameters<F>) {
    if (timer) {
      return;
    }

    timer = setTimeout(() => {
      func.apply(this, args);

      timer = null;
    }, delay);
  };
};

// 防抖
export const debounce = <F extends (...args: any[]) => any>(func: F, delay = 300) => {
  let timer: number;

  return function (this: ThisParameterType<F>, ...args: Parameters<F>) {
    clearTimeout(timer);

    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};

// 是否是APP
export const isApp = (): boolean => {
  const isNative = getQueryParams('isNative');

  return 'native' in window || isNative === '1';
};

// 是否是移动端
export const isMobile = (): boolean => {
  const userAgent = navigator.userAgent;

  return /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i.test(
    userAgent,
  );
};

// 是否是IOS
export const isIOS = (): boolean => {
  const userAgent = navigator.userAgent;

  return /(iPad|iPhone|iPod)/i.test(userAgent);
};

// 是否是Android
export const isAndroid = (): boolean => {
  const userAgent = navigator.userAgent;

  return /android/i.test(userAgent);
};

/**
 * 通过key获取url查询部分中value
 * @param {string} key 关键词
 * @param {number} search 查询部分
 * @returns {string}
 */
export const getQueryParams = (key = '', search?: string): string => {
  const paramsString = typeof search === 'string' && search !== '' ? search : location.search;
  const searchParams = new URLSearchParams(paramsString);
  let context = '';

  if (searchParams.has(key)) {
    context = searchParams.get(key) as string;
  }

  return context;
};

/**
 * 模板
 * @param {Array<any>} params 数据
 * @returns {string}
 */
export const template = (...params: any[]): string => {
  const nargs = /\{([0-9a-zA-Z_]+)\}/g;
  let args: any;

  if (params.length === 2 && typeof params[1] === 'object') {
    args = params[1];
  } else {
    args = new Array(params.length - 1);
    for (let i = 1; i < params.length; ++i) {
      args[i - 1] = params[i];
    }
  }

  if (!args || !args.hasOwnProperty) {
    args = {};
  }

  const str: string = params[0];

  return str.replace(nargs, function replaceArg(match, i, index) {
    let result;

    if (str[index - 1] === '{' && str[index + match.length] === '}') {
      return i;
    } else {
      result = args.hasOwnProperty(i) ? args[i] : null;
      if (result === null || result === undefined) {
        return '';
      }

      return result;
    }
  });
};

/**
 * 更新剪切板元素
 * @param {string} text 文本
 */
const updateClipboardElem = (text = ''): void => {
  let elem = document.getElementById('clipboard') as HTMLTextAreaElement;

  if (!elem) {
    elem = document.createElement('textarea');
    elem.id = 'clipboard';
    elem.style.position = 'fixed';
    elem.style.top = '0';
    elem.style.clipPath = 'inset(0, 0, 0, 0)';
    elem.style.opacity = '0';
    elem.style.zIndex = '0';
    //防止移动端键盘弹出
    elem.setAttribute('readonly', 'readonly');
    document.body.appendChild(elem);
  }

  elem.value = text;
};

/**
 * 通过剪切板复制
 * @return {boolean} result
 */
const copyWidthClipboard = (): boolean => {
  let result = false;

  if (document.execCommand) {
    const elem = document.getElementById('clipboard') as HTMLTextAreaElement;

    elem.select();
    document.execCommand('copy');

    result = true;
  }

  return result;
};

/**
 * 复制
 * @param {string} text 文案
 * @return {Promise<void>} promise
 */
export const copy = (text = ''): Promise<boolean> => {
  return new Promise(resolve => {
    if (typeof text !== 'string' || text === '') {
      resolve(false);

      return;
    }

    text = ('' + text).trim();

    updateClipboardElem(text);

    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          resolve(true);
        })
        .catch(err => {
          const result = copyWidthClipboard();

          resolve(!!result);
        });
    } else {
      const result = copyWidthClipboard();

      resolve(!!result);
    }
  });
};

/* run Generator */
export function runGenerator(gen: any) {
  if (!gen) return;
  const item = gen.next();
  if (item.done) {
    return item.value;
  }
  const {value, done} = item;
  if (value instanceof Promise) {
    value.then(e => runGenerator(gen));
  } else {
    runGenerator(gen);
  }
}
/**
 * 分享
 * @param {string} type 分享类型 facebook, twitter, telegram
 * @param {string} title 分享标题
 * @param {string} desc 分享描述
 * @param {string} url 分享链接
 */
export const share = (type: string, data: {title?: string; desc?: string; url?: string} = {}): void => {
  const {title = '', desc = '', url = ''} = data;
  let shareUrl = '';

  const _url = url !== '' ? url : shareUrl;

  switch (type) {
    case 'facebook':
      const str = location.origin + '/share/' + title + '/' + desc + '/' + _url;

      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(str)}`;
      break;
    case 'twitter':
      shareUrl = `https://www.twitter.com/intent/tweet?url=${encodeURIComponent(_url)}&text=${encodeURIComponent(
        title,
      )}`;
      break;
    case 'telegram':
      // https://t.me/share/url?url={url}&text={text}
      shareUrl = `https://www.telegram.me/share/url?url=${encodeURIComponent(_url)}&text=${encodeURIComponent(title)}`;
      break;
    default:
      break;
  }

  if (shareUrl) {
    location.href = shareUrl;
  }
};
