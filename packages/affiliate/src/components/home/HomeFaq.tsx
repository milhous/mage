import {useTranslate} from '@ui/i18n';
import UIFaq from '@ui/faq';

import './HomeFaq.less';

// 常见问题
const HomeFaq = (): JSX.Element => {
  const t = useTranslate(['affiliate']);

  const list: {question: string; answer: string}[] = [];

  for (let i = 0; i < 6; i++) {
    const index = i + 1;

    list.push({
      question: t('faq_q' + index),
      answer: t('faq_a' + index),
    });
  }

  return (
    <section className="affiliate-faq">
      <UIFaq title={t('faq_title')} list={list} />
    </section>
  );
};

export default HomeFaq;
