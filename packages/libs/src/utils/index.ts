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
