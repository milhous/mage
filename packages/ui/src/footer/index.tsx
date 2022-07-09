import {useTransition, useState, useEffect} from 'react';

import CompNav from './components/CompNav';
import CompPartners from './components/CompPartners';
import CompAssume from './components/CompAssume';
import CompCopyright from './components/CompCopyright';

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
      <CompAssume />
      <CompCopyright />
    </div>
  );
};

export default UIFooter;
