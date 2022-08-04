import {useState, useEffect, useMemo} from 'react';

import {ModalType} from '@libs/config';
import {useModal} from '@libs/modal';
import WidgetModal from '@widget/modal';

import './Signup.less';

// 注册
const Signup = (): JSX.Element => {
  const {visible, setVisible, data} = useModal(ModalType.SIGN_UP);

  return (
    <WidgetModal
      isActive={visible}
      onClose={() => {
        setVisible(false);
      }}
    >
      <div>Signup</div>
    </WidgetModal>
  );
};

export default Signup;
