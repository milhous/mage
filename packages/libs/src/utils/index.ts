/**
 * 通过key获取url查询部分中value
 * @param {string} key 关键词
 * @param {number} search 查询部分
 */
export const getQueryParams = (key = '', search?: string): string => {
  const reg = new RegExp('(^|&)' + key + '=([^&]*)(&|$)', 'i');
  const str = typeof search === 'string' && search !== '' ? search : window.location.search;
  const arr: string[] | null = str.substring(1).match(reg);
  let context = '';

  if (Array.isArray(arr) && typeof arr[2] === 'string') {
    context = arr[2];
  }

  return context;
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
  let {title = '', desc = '', url = ''} = data;
  let shareUrl = '';

  url = url !== '' ? url : shareUrl;

  switch (type) {
    case 'facebook':
      const str = location.origin + '/share/' + title + '/' + desc + '/' + url;

      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(str)}`;
      break;
    case 'twitter':
      shareUrl = `https://www.twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(
        title,
      )}`;
      break;
    case 'telegram':
      // https://t.me/share/url?url={url}&text={text}
      shareUrl = `https://www.telegram.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
      break;
    default:
      break;
  }

  if (shareUrl) {
    location.href = shareUrl;
  }
};
