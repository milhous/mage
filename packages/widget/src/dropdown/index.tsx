import React, {useEffect, useMemo, useRef, useState} from 'react';
import Dropdown from 'rc-dropdown';
import Menu, {Item as MenuItem, MenuRef} from 'rc-menu';
import Tooltip from 'rc-tooltip';
import {Scrollbars} from 'rc-scrollbars';

import './index.less';
import IconArrow from './icon-arrow.svg';

/**
 * 声明 - 下拉
 * @param {Array<IWidgetDropdownList>} 列表
 * @param {string} selected 已选（对应list中val）
 * @param {number} max 最多显示数量
 * @param {Array<string>} trigger 触发方式，默认['click']
 * @param {function} onSelect 选中回调
 */
export interface IWidgetDropdownProps {
  list: IWidgetDropdownList[];
  selected: string;
  max?: number;
  trigger?: string[];
  onSelect: (val: IWidgetDropdownList) => void;
}

/**
 * 声明 - 列表
 * @param {string} val 值
 * @param {string} desc 描述（展示用）
 */
export interface IWidgetDropdownList {
  val: string;
  desc: string;
}

// 摆放类型
const PlacementType = {
  TOP_CENTER: 'topCenter',
  BOTTOM_CENTER: 'bottomCenter',
};

/**
 * 获取摆放类型
 * @param {HTMLDivElement | null} elem 元素
 * @param {number} nums 显示数量
 * @returns {string}
 */
const getPlacementType = (elem: HTMLDivElement | null, nums: number): string => {
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
const getDescWithSelected = (list: IWidgetDropdownList[], selected: string): string => {
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
const getDescWithKey = (list: IWidgetDropdownList[], key: string): string => {
  let desc = '';
  const item = list[Number(key)];

  if (!!item) {
    desc = item.desc;
  }

  return desc;
};

/**
 * 下拉菜单
 * @param {Array<IWidgetDropdownList>} props.list 列表
 * @param {string} props.selected 已选中值
 * @param {function} props.onSelect 选择回调
 * @param {number} props.max 显示最大数量
 * @returns
 */
const DropdownMenu = (props: {
  list: IWidgetDropdownList[];
  selected: string;
  onSelect: any;
  max: number;
}): JSX.Element => {
  const {list, selected, onSelect, max} = props;
  const defaultSelectedKeys: string[] = [];
  const MenuItems: JSX.Element[] = [];

  const container = useRef<MenuRef>(null);
  const [menuHeigh, setMenuHeight] = useState<number>(0);

  for (let i = 0, len = list.length; i < len; i++) {
    const key = '' + i;
    const {val, desc} = list[i];

    if (val === selected) {
      defaultSelectedKeys.push(key);
    }

    MenuItems.push(<MenuItem key={key}>{desc}</MenuItem>);
  }

  useEffect(() => {
    if (!!container.current) {
      const {height} = container.current.list.getBoundingClientRect();
      const itemHeight = height / list.length;
      const nums = list.length > max ? max : list.length;

      setMenuHeight(itemHeight * nums);
    }
  }, []);

  return (
    <Scrollbars style={{height: menuHeigh}}>
      <Menu onSelect={onSelect} defaultSelectedKeys={defaultSelectedKeys} ref={container}>
        {MenuItems}
      </Menu>
    </Scrollbars>
  );
};

// 下拉
const WidgetDropdown = (props: IWidgetDropdownProps): JSX.Element => {
  const {list = [], selected = '', max = 10, trigger = ['click'], onSelect} = props;
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
      const nums = list.length > max ? max : list.length;
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
      overlay={() => <DropdownMenu list={list} selected={selected} onSelect={handleSelect} max={max} />}
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
