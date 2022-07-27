import {useState, useEffect, useRef} from 'react';

import {useInterval} from '@libs/hooks';

import './CompPartners.less';

// 合作商
const CompPartners = (props: {partners: string[]}): JSX.Element => {
  const comps: JSX.Element[] = [];
  const [animState, setAnimState] = useState<number>(1);
  const container = useRef<HTMLElement>(null);
  const list = useRef<HTMLUListElement>(null);

  for (const src of props.partners) {
    comps.push(
      <li key={src}>
        <img src={src} />
      </li>,
    );
  }

  // logo滚动
  useInterval(() => {
    if (!!container.current && !!list.current) {
      const max = list.current.clientHeight / container.current.clientHeight;
      let index = animState + 1;

      if (index > max) {
        index = 1;
      }

      setAnimState(index);
    }
  }, 3000);

  return (
    <div className="ui-footer_partner">
      <section ref={container}>
        <ul className={`state-${animState}`} ref={list}>
          {comps}
        </ul>
      </section>
    </div>
  );
};

export default CompPartners;
