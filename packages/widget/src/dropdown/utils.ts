// 摆放类型
export const PlacementType = {
  TOP_CENTER: 'topCenter',
  BOTTOM_CENTER: 'bottomCenter',
  LEFT_CENTER: 'leftCenter',
  RIGHT_CENTER: 'rightCenter',
};

/**
 * 获取摆放类型
 * @param {HTMLDivElement | null} elem 元素
 * @param {number} nums 显示数量
 * @returns {string}
 */
export const getPlacementType = (elem: HTMLDivElement | null, nums: number): string => {
  let placement = PlacementType.BOTTOM_CENTER;

  if (!!elem) {
    const {height, bottom} = elem.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const listHeight = height * nums;

    if (windowHeight - bottom < listHeight) {
      placement = PlacementType.TOP_CENTER;
    }
  }

  return placement;
};

/**
 * 根据已选中值获取描述
 * @param {Array<IWidgetDropdownList>} list 列表
 * @param {string} selected 已选中值
 */
export const getDescWithSelected = (list: IWidgetDropdownList[], selected: string): string => {
  let desc = '';

  for (const item of list) {
    if (item.val === selected) {
      desc = item.desc;

      break;
    }
  }

  return desc;
};

/**
 * 根据选中key获取描述
 * @param {Array<IWidgetDropdownList>} list 列表
 * @param {string} key 已选中key
 */
export const getDescWithKey = (list: IWidgetDropdownList[], key: string): string => {
  let desc = '';
  const item = list[Number(key)];

  if (!!item) {
    desc = item.desc;
  }

  return desc;
};
