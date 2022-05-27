import SVG from 'react-inlinesvg';

import Svga from '@ui/svga/Svga';
import './Home.less';
import iconFacebook from '@app/assets/icon-facebook.svg';
import howBg from '@app/assets/how-bg.jpg';
import astrolabeLibra from '@app/assets/astrolabe-libra.svga';

export default function Home(): JSX.Element {
  return (
    <div className="staking">
      Hello world!!!
      <SVG src={iconFacebook} />
      <img src={howBg} />
      <i className="icon"></i>
      <i className="img"></i>
      <div className="svga">
        <Svga url={astrolabeLibra} />
      </div>
    </div>
  );
}
