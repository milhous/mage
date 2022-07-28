import {useTranslate} from '@libs/i18n';
import WidgetFaq from '@widget/faq';

import {useInviteBasics} from '@app/hooks';

import './HomeFaq.less';

// 常见问题
const HomeFaq = (): JSX.Element => {
  const t = useTranslate(['referral']);
  const {firstBet, lutPrize, betDivisor, rebateAmount, singleLimit, rebateLimit, flowRate} = useInviteBasics();

  const list: {question: string; answer: string}[] = [];

  for (let i = 0; i < 6; i++) {
    const index = i + 1;

    const question = t('faq_q' + index);
    let answer = t('faq_a' + index);

    switch (index) {
      case 3:
        answer = t('faq_a' + index, {lutPrize, rebateAmount});

        break;
      case 4:
        answer = t('faq_a' + index, {firstBet, lutPrize});

        break;
      case 5:
        answer = t('faq_a' + index, {
          betDivisor,
          rebateAmount,
          singleLimit,
          rebateLimit,
        });

        break;
      case 6:
        answer = t('faq_a' + index, {flowRate});

        break;
    }

    list.push({
      question,
      answer,
    });
  }

  return (
    <section className="referral-faq">
      <WidgetFaq title={t('faq_title')} list={list} />
    </section>
  );
};

export default HomeFaq;
