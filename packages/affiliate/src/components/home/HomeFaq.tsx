import {useTranslate} from '@ui/i18n';

import './HomeFaq.less';

// 常见问题
const HomeFaq = (): JSX.Element => {
  const t = useTranslate(['affiliate']);

  const elems: JSX.Element[] = [];

  for (let i = 0; i < 6; i++) {
    const index = i + 1;
    const str = t('faq_a' + index);

    elems.push(
      <li key={index}>
        <input type="checkbox" id={`agentFaq${i}`} />
        <label htmlFor={`agentFaq${i}`}>
          <dl>
            <dt>
              <i></i>
              {t('faq_q' + index)}
            </dt>
            <dd>{str}</dd>
          </dl>
        </label>
      </li>,
    );
  }

  return (
    <section className="affiliate-faq">
      <h3>{t('faq_title')}</h3>
      <ul>{elems}</ul>
    </section>
  );
};

export default HomeFaq;
