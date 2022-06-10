import UISvg from '../svg';

import './index.less';
import spinnerBg from './spinner-bg.svg';
import spinnerLogo from './spinner-logo.svg';

const Spinner = (): JSX.Element => {
  return (
    <div className="ui-spinner">
      <div className="spinner-box">
        <UISvg src={spinnerBg} className="spinner-bg" />
        <UISvg src={spinnerLogo} className="spinner-logo" />
      </div>
    </div>
  );
};

export default Spinner;
