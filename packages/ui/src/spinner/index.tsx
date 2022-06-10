import React from 'react';

import './index.less';
import SpinnerBg from './spinner-bg.svg';
import SpinnerLogo from './spinner-logo.svg';

const Spinner: React.FC = () => {
  return (
    <div className="ui-spinner">
      <div className="spinner-box">
        <SpinnerBg className="spinner-bg" />
        <SpinnerLogo className="spinner-logo" />
      </div>
    </div>
  );
};

export default Spinner;
