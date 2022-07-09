import {useTransition, useState, useEffect} from 'react';

import CompNav from './components/CompNav';
import CompPartners from './components/CompPartners';

import './index.less';

// footer
const UIFooter = (): JSX.Element => {
  const [isPending, startTransition] = useTransition();
  // 设置合作商Logo
  const [partners, setPartners] = useState<string[]>([]);

  useEffect(() => {
    startTransition(() => {
      (async () => {
        const paths: string[] = [];

        for (let i = 0; i < 26; i++) {
          const moudle: any = await import(`./assets/footer-partner${i + 1}.png`);

          if (!!moudle) {
            paths.push(moudle.default);
          }
        }

        if (paths.length) {
          setPartners(paths);
        }
      })();
    });
  }, []);

  return (
    <div className="ui-footer">
      <CompNav />
      {!isPending && <CompPartners partners={partners} />}
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
