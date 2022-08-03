import {useState} from 'react';
import ReactDOM from 'react-dom';
import {CSSTransition} from 'react-transition-group';

import './@types/index.d';
import './index.less';

// 加载
const WidgetModal = (props: IWidgetModalProps): JSX.Element => {
  const {isActive, children, onShow, onClose} = props;
  const [showMessage, setShowMessage] = useState(false);

  return (
    <CSSTransition
      in={showMessage}
      timeout={300}
      classNames="widget-modal"
      unmountOnExit
      onEnter={() => !!onShow && onShow()}
      onExited={() => !!onClose && onClose()}
    >
      <div className="widget-modal">
        <div className="widget-modal_mask"></div>
        <div className="widget-modal_container">{children}</div>
      </div>
    </CSSTransition>
  );
};

export default WidgetModal;
