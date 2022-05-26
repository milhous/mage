import SVG from 'react-inlinesvg';

import './Home.less';
import iconFacebook from '@/assets/icon-facebook.svg';
import howBg from '@/assets/how-bg.jpg';

export default (): JSX.Element => {
    return <div className="staking">
        Hello world!!!
        <SVG src={iconFacebook} />
        <img src={howBg} />
        <i className="icon"></i>
        <i className="img"></i>
    </div>
};