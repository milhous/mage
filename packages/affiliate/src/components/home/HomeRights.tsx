import {useTranslate} from '@ui/i18n';

import Assets from '@app/assets';

import './HomeRights.less';

// 专属权益
const HomeRights = (): JSX.Element => {
  const t = useTranslate(['affiliate']);

  return (
    <section className="affiliate-rights">
      <div>
        <aside>
          <img src={Assets.HomeRightsPic} />
        </aside>
        <article>
          <h3>{t('rights_title')}</h3>
          <p>{t('rights_subtitle')}</p>
          <ul>
            <li>{t('rights_desc1')}</li>
            <li>{t('rights_desc2')}</li>
            <li>{t('rights_desc3')}</li>
          </ul>
        </article>
      </div>
    </section>
  );
};

export default HomeRights;
