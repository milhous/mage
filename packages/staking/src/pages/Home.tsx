import {useEffect} from 'react';
import SVG from 'react-inlinesvg';

import Svga from '@ui/svga';
import {useTranslate} from '@ui/i18n';
import {toast, error} from '@ui/Toastify';
import './Home.less';
import iconFacebook from '@app/assets/icon-facebook.svg';
import howBg from '@app/assets/how-bg.jpg';
import astrolabeLibra from '@app/assets/astrolabe-libra.svga';

export default function Home(): JSX.Element {
  const t = useTranslate(['referral']);

  useEffect(() => {
    toast(t('links_set_default'));

    error(t('operation'));
  }, []);

  return (
    <div className="staking">
      Hello world!!!
      <span>{t('operation')}</span>
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
