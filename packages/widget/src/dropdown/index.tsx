import React, {useEffect, useMemo, useRef, useState} from 'react';
import Dropdown from 'rc-dropdown';
import Menu, {Item as MenuItem} from 'rc-menu';
import Tooltip from 'rc-tooltip';
import {Scrollbars} from 'rc-scrollbars';

import './index.less';
import IconArrow from './icon-arrow.svg';

function onSelect(props: {key: string}): void {
  console.log(`${props} selected`);
}

function onVisibleChange(visible: boolean): void {
  console.log(visible);
}

const menu = (
  <Menu onSelect={onSelect}>
    <MenuItem key="1" disabled>
      disabled
    </MenuItem>
    <MenuItem key="2">one</MenuItem>
    <MenuItem key="3">two</MenuItem>
  </Menu>
);

// 下拉
const WidgetDropdown = (): JSX.Element => {
  const container = useRef<HTMLDivElement>(null);

  return (
    <Dropdown
      trigger={['click']}
      overlay={menu}
      animation="slide-up"
      onVisibleChange={onVisibleChange}
      getPopupContainer={() => container.current as HTMLDivElement}
      placement="bottomCenter"
    >
      <div className="widget-dropdown" ref={container}>
        <div className="widget-dropdown_selected">
          <span>11111</span>
          <IconArrow />
        </div>
      </div>
    </Dropdown>
  );
};

export default WidgetDropdown;
