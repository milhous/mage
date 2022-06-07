import React, {useState, useEffect} from 'react';
import SVG from 'react-inlinesvg';

import loadComponent from '@librarys/loadComponent/index';
import Svga from '@ui/svga';
import {useTranslate} from '@ui/i18n';
import {toast, error} from '@ui/Toastify';
import './Home.less';
import iconFacebook from '@app/assets/icon-facebook.svg';
import howBg from '@app/assets/how-bg.jpg';
import astrolabeLibra from '@app/assets/astrolabe-libra.svga';

interface ISystem {
  remote: string;
  url: string;
  module: string;
}

const System = (props: {system: ISystem}): JSX.Element => {
  const {system} = props;
  const {remote, module, url} = system;

  const Component = React.lazy(loadComponent(remote, 'default', module, url));

  return (
    <React.Suspense fallback="Loading System">
      <Component />
    </React.Suspense>
  );
};

export default function Home(): JSX.Element {
  const t = useTranslate(['referral']);
  const [system, setSystem] = useState({
    remote: 'test',
    url: 'https://www.local.devbitgame.com:9011/remoteEntry.js',
    module: './App',
  });

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
      <System system={system} />
    </div>
  );
}
