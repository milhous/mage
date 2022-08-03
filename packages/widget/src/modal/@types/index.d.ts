/**
 * 声明 - 下拉
 * @param {boolean} isActive 是否激活
 * @param {React.ReactNode | React.ReactNode[]} children 子元素
 * @param {function} onShow 显示回调
 * @param {function} onClose 关闭回调
 */
declare interface IWidgetModalProps {
  isActive: boolean;
  children?: React.ReactNode | React.ReactNode[];
  onShow?: () => void;
  onClose?: () => void;
}
