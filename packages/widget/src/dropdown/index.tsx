import React, {useEffect, useMemo, useRef, useState} from 'react';
import Dropdown from 'rc-dropdown';
import Menu, {Item as MenuItem} from 'rc-menu';
import Tooltip from 'rc-tooltip';
import {Scrollbars} from 'rc-scrollbars';

import './index.less';

function onSelect(props: {key: string}): void {
  const {key} = props;

  console.log(`${key} selected`);
}

function onVisibleChange(visible: boolean): void {
  console.log(visible);
}

const menu = (
  <Menu onSelect={onSelect}>
    <MenuItem disabled>disabled</MenuItem>
    <MenuItem key="1">one</MenuItem>
    <MenuItem key="2">two</MenuItem>
  </Menu>
);

// 下拉
const WidgetDropdown = (): JSX.Element => {
  return (
    <Dropdown trigger={['click']} overlay={menu} animation="slide-up" onVisibleChange={onVisibleChange}>
      <div>1111</div>
    </Dropdown>
  );
};

export default WidgetDropdown;
