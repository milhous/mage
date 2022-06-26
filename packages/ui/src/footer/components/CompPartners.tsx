import {useTransition, useState, useEffect} from 'react';

import {useInterval} from '@libs/hook';

import './CompPartners.less';

// 合作商
const CompPartners = (props: {partners: string[]}): JSX.Element => {
  const comps: JSX.Element[] = [];
  const [animState, setAnimState] = useState<number>(1);

  for (const src of props.partners) {
    comps.push(
      <li key={src}>
        <img src={src} />
      </li>,
    );
  }

  useInterval(() => {
    console.log(1111);
  }, 3000);

  return (
    <div className="ui-footer_partner">
      <section>
        <ul className={`state-${animState}`}>{comps}</ul>
      </section>
    </div>
  );
};

export default CompPartners;
