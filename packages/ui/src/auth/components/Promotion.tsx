import {useState, useEffect} from 'react';

import {template} from '@libs/utils';
import {useTranslate, useLang} from '@libs/i18n';

import {apiRegSlogan, apiBetNum} from '@app/auth/api';
import Assets from '@app/auth/assets/index';

import './Promotion.less';

// 推广
export const Promotion = (): JSX.Element => {
  const t = useTranslate(['auth']);
  const lang = useLang();

  const [sloganList, setSloganList] = useState<string[]>([]);
  const [betNum, setBetNum] = useState<number>(0);

  useEffect(() => {
    // 推广文案
    apiRegSlogan({langue: lang}).then((res: string[]) => {
      setSloganList(res);
    });
  }, [lang]);

  return (
    <div className="ui-auth_promotion">
      <div>
        <Assets.IconLogo />
        {/* <h3>{t('register_get')}</h3> */}
        <ul>
          {sloganList.map((v: string, index: number) => {
            return (
              <li
                key={index}
                dangerouslySetInnerHTML={{
                  __html: template(decodeURIComponent(v)),
                }}
              ></li>
            );
          })}
        </ul>
      </div>
      {/* <div className="login-promotion_bet">{t('betAmount').replace('{amount}', betNum.toLocaleString())}</div> */}
    </div>
  );
};

export default Promotion;
