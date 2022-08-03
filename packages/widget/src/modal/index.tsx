import {Suspense, useState, useEffect, useMemo, useRef} from 'react';
import {createPortal} from 'react-dom';
import {CSSTransition} from 'react-transition-group';

import './@types/index.d';
import './index.less';

let container: HTMLElement;
let counter = 0;

// 获取容器
const getContainer = (): void => {
  if (document.fullscreenElement) {
    const elem: HTMLElement | null = document.getElementById('bitgame-game-panel');

    if (!!elem) {
      container = elem;
    }
  }

  if (!container) {
    const elem: HTMLElement | null = document.querySelector('.widget-modal_root');

    if (!!elem) {
      container = elem;
    } else {
      container = document.createElement('div');
      container.classList.add('widget-modal_root');
      document.body.appendChild(container);
    }
  }
};

// 加载
const WidgetModal = (props: IWidgetModalProps): JSX.Element => {
  const {isActive, disableMaskClick = false, onShow, onClose, children} = props;

  if (!container) {
    getContainer();
  }

  const [visible, setVisible] = useState<boolean>(false);
  const isIn = useMemo(() => {
    return isActive && visible;
  }, [isActive, visible]);

  useEffect(() => {
    setVisible(isActive);
  }, [isActive]);

  useEffect(() => {
    if (visible) {
      counter += 1;
    } else {
      counter -= 1;
    }

    if (counter < 0) {
      counter = 0;
    }

    console.log('counter', counter);
  }, [visible]);

  // 关闭
  const handleClose = (evt: any) => {
    evt.preventDefault();
    evt.stopPropagation();

    if (disableMaskClick) {
      return;
    }

    setVisible(false);
  };

  return createPortal(
    <CSSTransition
      in={isIn}
      timeout={300}
      classNames="widget-modal"
      unmountOnExit
      onEnter={() => !!onShow && onShow()}
      onExited={() => !!onClose && onClose()}
    >
      <Suspense fallback="Loading">
        <div className="widget-modal">
          <div className="widget-modal_mask" onClick={handleClose}></div>
          <div className="widget-modal_container">
            <div className="widget-modal_content">{children}</div>
          </div>
        </div>
      </Suspense>
    </CSSTransition>,
    container,
  );
};

export default WidgetModal;
