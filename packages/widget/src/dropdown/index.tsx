import React, {useEffect, useMemo, useRef, useState} from 'react';
import Dropdown from 'rc-dropdown';
import Menu, {Item as MenuItem} from 'rc-menu';
import Tooltip from 'rc-tooltip';
import {Scrollbars} from 'rc-scrollbars';

import './index.less';
import IconArrow from './icon-arrow.svg';

/**
 * 声明 - 下拉
 * @param {Array<IWidgetDropdownList>} 列表
 * @param {string} selected 已选（对应list中val）
 * @param {Array<string>} trigger 触发方式，默认['click']
 * @param {function} onSelect 选中回调
 */
export interface IWidgetDropdownProps {
  list: IWidgetDropdownList[];
  selected: string;
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
 * 获取菜单
 * @param {Array<IWidgetDropdownList>} list 列表
 * @param {string} selected 已选中值
 * @param {function} onSelect 选择回调
 * @returns
 */
const getMenu = (list: IWidgetDropdownList[], selected: string, onSelect: any): JSX.Element => {
  const defaultSelectedKeys: string[] = [];
  const MenuItems: JSX.Element[] = [];

  for (let i = 0, len = list.length; i < len; i++) {
    const key = '' + i;
    const {val, desc} = list[i];

    if (val === selected) {
      defaultSelectedKeys.push(key);
    }

    MenuItems.push(<MenuItem key={key}>{desc}</MenuItem>);
  }

  return (
    <Menu onSelect={onSelect} defaultSelectedKeys={defaultSelectedKeys}>
      {MenuItems}
    </Menu>
  );
};

// 下拉
const WidgetDropdown = (props: IWidgetDropdownProps): JSX.Element => {
  const {list = [], selected = '', trigger = ['click'], onSelect} = props;
  const container = useRef<HTMLDivElement>(null);

  const [selectedDesc, setSelectedDesc] = useState<string>(getDescWithSelected(list, selected));

  const handleSelect = (evt: any): void => {
    const desc = getDescWithKey(list, evt.key);

    if (desc !== '') {
      setSelectedDesc(desc);

      if (typeof onSelect === 'function') {
        onSelect(list[Number(evt.key)]);
      }
    }
  };

  return (
    <Dropdown
      trigger={trigger}
      overlay={() => getMenu(list, selected, handleSelect)}
      animation="slide-up"
      getPopupContainer={() => container.current as HTMLDivElement}
      placement="bottomCenter"
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
