import {useTransition, useState, useEffect} from 'react';

import './index.less';

// 合作商 Logo
const CompPartnerLogo = (props: {url: string}): JSX.Element => {
  const [isPending, startTransition] = useTransition();
  const [src, setSrc] = useState('');

  useEffect(() => {
    startTransition(() => {
      (async () => {
        const moudle: any = await import(`${props.url}.png`);

        if (!!moudle) {
          setSrc(moudle.default);
        }
      })();
    });
  }, []);

  return <>{!isPending && <img src={src} />}</>;
};

// 合作商
const CompPartners = (props: {nums: number}): JSX.Element => {
  const comps: JSX.Element[] = [];

  for (let i = 0; i < props.nums; i++) {
    comps.push(
      <li key={i}>
        <CompPartnerLogo url={`./assets/footer-partner${i + 1}`} />
      </li>,
    );
  }

  return <ul>{comps}</ul>;
};

// footer
const UIFooter = (): JSX.Element => {
  return (
    <div className="ui-footer">
      <div className="ui-footer_nav">
        <section>
          <article>
            <dl>
              <dt>賽事</dt>
              <dd>首頁</dd>
              <dd>滚球</dd>
              <dd>智能合約</dd>
              <dd>競猜細則</dd>
            </dl>
            <dl>
              <dt>遊戲</dt>
              <dd>全部</dd>
              <dd>自研</dd>
              <dd>Slots</dd>
              <dd>桌面遊戲</dd>
              <dd>真人娛樂</dd>
              <dd>虛擬體育</dd>
            </dl>
            <dl>
              <dt>優惠活動</dt>
              <dd>優惠活動</dd>
              <dd>邀請</dd>
              <dd>Affiliate</dd>
            </dl>
            <dl>
              <dt>關於我們</dt>
              <dd>平台公告</dd>
              <dd>關於Bitgame</dd>
              <dd>Bitgame新手學院</dd>
              <dd>使用條款</dd>
              <dd>隱私服務</dd>
              <dd>幣種聲明</dd>
              <dd>負責任的娛樂平台</dd>
              <dd>自我排除規則與條款</dd>
              <dd>客服郵箱:service@bitgame.com</dd>
            </dl>
          </article>
          <aside>
            <div className="ui-preferences">
              <h3>偏好設置</h3>
            </div>
            <div className="ui-footer_download">
              <h3>App下載</h3>
            </div>
          </aside>
        </section>
      </div>
      <div className="ui-footer_partner">
        <section>
          <CompPartners nums={26} />
        </section>
      </div>
      <div className="ui-footer_assume">
        <section>
          <span>18+</span>
        </section>
      </div>
      <div className="ui-footer_copyright">
        <section>
          <p>
            Copyright 2019 - King of Fortune Island - Max Blue N.V. is owned and operated by Max Blue N.V., a company
            registered and established under the laws of Curacao and its wholly owned subsidiary, Max Blue Limited,
            registered address Zuikertuintjeweg Z/N (Zuikertuin Tower), Curaçao.
          </p>
        </section>
      </div>
    </div>
  );
};

export default UIFooter;
