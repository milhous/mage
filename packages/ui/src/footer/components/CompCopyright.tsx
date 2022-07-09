import {useTranslate} from '@libs/i18n';

import './CompCopyright.less';

// 版权
const CompCopyright = (): JSX.Element => {
  const t = useTranslate(['footer']);

  return (
    <div className="ui-footer_copyright">
      <section>
        <p>{t('license')}</p>
      </section>
    </div>
  );
};

export default CompCopyright;
