import React, {useEffect, useMemo, useRef, useState} from 'react';
import Dropdown from 'rc-dropdown';
import Menu, {Item as MenuItem, MenuRef} from 'rc-menu';
import Tooltip from 'rc-tooltip';
import {Scrollbars} from 'rc-scrollbars';

import './index.d';
import './index.less';
import {PlacementType, getDescWithKey, getDescWithSelected, getPlacementType} from './utils';
import IconArrow from './icon-arrow.svg';

/**
 * 菜单提示
 * @param {string} props.desc 描述
 * @param {DOMRect} props.targeRect 目标Rect信息
 */
const DropdownMenuTips = (props: {desc: string; targeRect: DOMRect | undefined}): JSX.Element => {
  const {desc = '', targeRect} = props;

  const container = useRef<HTMLParagraphElement>(null);
  const [styles, setStyles] = useState<{[key: string]: string | number}>({});
  const [placement, setPlacement] = useState<string>('');

  useEffect(() => {
    if (!!container.current && !!targeRect && desc !== '') {
      const windowWidth = window.innerWidth;
      const rect = container.current.getBoundingClientRect();
      const top = targeRect.top + (targeRect.height - rect.height) / 2;
      let styles = {};
      let _placement = '';

      if (targeRect.left > windowWidth / 2) {
        const right = windowWidth - targeRect.left;

        styles = {top, right};
        _placement = PlacementType.RIGHT_CENTER;
      } else {
        const left = targeRect.left + targeRect.width;

        styles = {top, left};
        _placement = PlacementType.LEFT_CENTER;
      }

      setStyles(styles);
      setPlacement(_placement);
    }
  }, [targeRect, desc]);

  return (
    <p ref={container} className={`widget-dropdown_tips ${placement} ${desc === '' ? 'hidden' : ''}`} style={styles}>
      {desc}
    </p>
  );
};

/**
 * 下拉菜单
 * @param {Array<IWidgetDropdownList>} props.list 列表
 * @param {string} props.selected 已选中值
 * @param {function} props.onSelect 选择回调
 * @param {number} props.max 显示最大数量
 * @param {boolean} props.showTips 显示提示
 */
const DropdownMenu = (props: {
  list: IWidgetDropdownList[];
  selected: string;
  onSelect: any;
  max: number;
  showTips: boolean;
}): JSX.Element => {
  const {list, selected, onSelect, max, showTips} = props;
  const defaultSelectedKeys: string[] = [];
  const MenuItems: JSX.Element[] = [];

  const container = useRef<MenuRef>(null);
  const [menuHeigh, setMenuHeight] = useState<number>(0);
  const [tipsDesc, setTipsDesc] = useState<string>('');
  const [menuItemRect, setMenuItemRect] = useState<DOMRect>();

  const onMouseEnter = (evt: {key: string; domEvent: React.MouseEvent<HTMLElement>}): void => {
    const desc = getDescWithKey(list, evt.key);
    const target = evt.domEvent.target as HTMLElement;
    const react = target.getBoundingClientRect();

    setTipsDesc(desc);
    setMenuItemRect(react);
  };

  const onMouseLeave = (evt: {key: string; domEvent: React.MouseEvent<HTMLElement>}): void => {
    setTipsDesc('');
  };

  for (let i = 0, len = list.length; i < len; i++) {
    const key = '' + i;
    const {val, desc} = list[i];

    if (val === selected) {
      defaultSelectedKeys.push(key);
    }

    if (showTips) {
      MenuItems.push(
        <MenuItem key={key} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
          {desc}
        </MenuItem>,
      );
    } else {
      MenuItems.push(<MenuItem key={key}>{desc}</MenuItem>);
    }
  }

  useEffect(() => {
    if (!!container.current) {
      const {height} = container.current.list.getBoundingClientRect();
      const itemHeight = height / list.length;
      const nums = Math.min(list.length, max);

      setMenuHeight(itemHeight * nums);
    }
  }, []);

  return (
    <>
      <Scrollbars style={{height: menuHeigh}}>
        <Menu onSelect={onSelect} defaultSelectedKeys={defaultSelectedKeys} ref={container}>
          {MenuItems}
        </Menu>
      </Scrollbars>
      <DropdownMenuTips desc={tipsDesc} targeRect={menuItemRect} />
    </>
  );
};

// 下拉
const WidgetDropdown = (props: IWidgetDropdownProps): JSX.Element => {
  const {list = [], selected = '', max = 10, trigger = ['click'], showTips = false, onSelect} = props;
  const container = useRef<HTMLDivElement>(null);

  const [placement, setPlacement] = useState<string>(PlacementType.TOP_CENTER);
  const [selectedDesc, setSelectedDesc] = useState<string>('');

  // 选择
  const handleSelect = (evt: any): void => {
    const desc = getDescWithKey(list, evt.key);

    if (desc !== '') {
      setSelectedDesc(desc);

      if (typeof onSelect === 'function') {
        onSelect(list[Number(evt.key)]);
      }
    }
  };

  // 点击
  const handleClick = (visible: boolean): void => {
    if (visible) {
      const nums = Math.min(list.length, max);
      const _placement = getPlacementType(container.current, nums);

      setPlacement(_placement);
    }
  };

  useEffect(() => {
    const desc = getDescWithSelected(list, selected);

    setSelectedDesc(desc);
  }, [list, selected]);

  return (
    <Dropdown
      trigger={trigger}
      overlay={<DropdownMenu list={list} selected={selected} onSelect={handleSelect} max={max} showTips={showTips} />}
      animation="slide-up"
      getPopupContainer={() => container.current as HTMLDivElement}
      placement={placement}
      onVisibleChange={handleClick}
    >
      <div className="widget-dropdown" ref={container}>
        <div className="widget-dropdown_selected">
          <span>{selectedDesc}</span>
          <IconArrow />
        </div>
      </div>
    </Dropdown>
  );
};

export default WidgetDropdown;
