/**
 * 声明 - 下拉
 * @param {Array<IWidgetDropdownList>} 列表
 * @param {string} selected 已选（对应list中val）
 * @param {number} max 最多显示数量
 * @param {Array<string>} trigger 触发方式，默认['click']
 * @param {boolean} showTips 显示
 * @param {function} onSelect 选中回调
 */
declare interface IWidgetDropdownProps {
  list: IWidgetDropdownList[];
  selected: string;
  max?: number;
  trigger?: string[];
  showTips?: boolean;
  onSelect: (val: IWidgetDropdownList) => void;
}

/**
 * 声明 - 列表
 * @param {string} val 值
 * @param {string} desc 描述（展示用）
 */
declare interface IWidgetDropdownList {
  val: string;
  desc: string;
}
