import './index.less';
import SpinnerBg from './spinner-bg.svg';
import SpinnerLogo from './spinner-logo.svg';

// 加载
const UISpinner = (): JSX.Element => {
  return (
    <div className="ui-spinner">
      <div className="ui-spinner_box">
        <SpinnerBg className="ui-spinner_bg" />
        <SpinnerLogo className="ui-spinner_logo" />
      </div>
    </div>
  );
};

export default UISpinner;
