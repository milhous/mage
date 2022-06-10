import {useTranslate} from '@ui/i18n';
import UISvg from '@ui/svg';

import Assets from '@app/assets';

import './HomeAdvantage.less';

// 竞争优势
const HomeAdvantage = (): JSX.Element => {
  const t = useTranslate(['affiliate']);

  return (
    <section className="affiliate-advantage">
      <h3>{t('advantage_title')}</h3>
      <div>
        <table cellSpacing="0" cellPadding="0">
          <thead>
            <tr>
              <th colSpan={2}>{t('advantage_th1')}</th>
              <th>{t('advantage_th2')}</th>
              <th>{t('advantage_th3')}</th>
              <th>{t('advantage_th4')}</th>
              <th>{t('advantage_th5')}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td rowSpan={2}>{t('advantage_col1_1')}</td>
              <td>{t('advantage_col2_1')}</td>
              <td>
                <UISvg src={Assets.HomeAdvantageIconYes} />
              </td>
              <td>
                <UISvg src={Assets.HomeAdvantageIconYes} />
              </td>
              <td>
                <UISvg src={Assets.HomeAdvantageIconYes} />
              </td>
              <td>
                <UISvg src={Assets.HomeAdvantageIconNo} className="advantage-icon_no" />
              </td>
            </tr>
            <tr>
              <td>{t('advantage_col2_2')}</td>
              <td>
                <UISvg src={Assets.HomeAdvantageIconYes} />
              </td>
              <td>
                <UISvg src={Assets.HomeAdvantageIconYes} />
              </td>
              <td>
                <UISvg src={Assets.HomeAdvantageIconYes} />
              </td>
              <td>
                <UISvg src={Assets.HomeAdvantageIconNo} className="advantage-icon_no" />
              </td>
            </tr>
            <tr>
              <td rowSpan={7}>{t('advantage_col1_2')}</td>
              <td>{t('advantage_col2_3')}</td>
              <td>
                <UISvg src={Assets.HomeAdvantageIconYes} />
              </td>
              <td>
                <UISvg src={Assets.HomeAdvantageIconYes} />
              </td>
              <td>
                <UISvg src={Assets.HomeAdvantageIconYes} />
              </td>
              <td>
                <UISvg src={Assets.HomeAdvantageIconYes} />
              </td>
            </tr>
            <tr>
              <td>{t('advantage_col2_4')}</td>
              <td>
                <UISvg src={Assets.HomeAdvantageIconYes} />
              </td>
              <td>
                <UISvg src={Assets.HomeAdvantageIconYes} />
              </td>
              <td>
                <UISvg src={Assets.HomeAdvantageIconYes} />
              </td>
              <td>
                <UISvg src={Assets.HomeAdvantageIconNo} className="advantage-icon_no" />
                <span>({t('advantage_tips1')})</span>
              </td>
            </tr>
            <tr>
              <td>{t('advantage_col2_5')}</td>
              <td>
                <UISvg src={Assets.HomeAdvantageIconYes} />
              </td>
              <td>
                <UISvg src={Assets.HomeAdvantageIconNo} className="advantage-icon_no" />
                <span>({t('advantage_tips2')})</span>
              </td>
              <td>
                <UISvg src={Assets.HomeAdvantageIconNo} className="advantage-icon_no" />
                <span>({t('advantage_tips2')})</span>
              </td>
              <td>
                <UISvg src={Assets.HomeAdvantageIconYes} />
              </td>
            </tr>
            <tr>
              <td>{t('advantage_col2_6')}</td>
              <td>
                <UISvg src={Assets.HomeAdvantageIconYes} />
              </td>
              <td>
                <UISvg src={Assets.HomeAdvantageIconYes} />
              </td>
              <td>
                <UISvg src={Assets.HomeAdvantageIconYes} />
              </td>
              <td>
                <UISvg src={Assets.HomeAdvantageIconNo} className="advantage-icon_no" />
                <span>({t('advantage_tips3')})</span>
              </td>
            </tr>
            <tr>
              <td>{t('advantage_col2_7')}</td>
              <td>
                <UISvg src={Assets.HomeAdvantageIconYes} />
              </td>
              <td>
                <UISvg src={Assets.HomeAdvantageIconNo} className="advantage-icon_no" />
                <span>({t('advantage_tips4')})</span>
              </td>
              <td>
                <UISvg src={Assets.HomeAdvantageIconYes} />
              </td>
              <td>
                <UISvg src={Assets.HomeAdvantageIconYes} />
              </td>
            </tr>
            <tr>
              <td>{t('advantage_col2_8')}</td>
              <td>
                <UISvg src={Assets.HomeAdvantageIconNo} className="advantage-icon_no" />
              </td>
              <td>
                <UISvg src={Assets.HomeAdvantageIconYes} />
              </td>
              <td>
                <UISvg src={Assets.HomeAdvantageIconNo} className="advantage-icon_no" />
              </td>
              <td>
                <UISvg src={Assets.HomeAdvantageIconNo} className="advantage-icon_no" />
              </td>
            </tr>
            <tr>
              <td>{t('advantage_col2_9')}</td>
              <td>
                <UISvg src={Assets.HomeAdvantageIconYes} />
                <strong>({t('advantage_tips5')})</strong>
              </td>
              <td>
                <UISvg src={Assets.HomeAdvantageIconNo} className="advantage-icon_no" />
                <span>({t('advantage_tips6')})</span>
              </td>
              <td>
                <UISvg src={Assets.HomeAdvantageIconYes} />
                <strong>({t('advantage_tips7')})</strong>
              </td>
              <td>
                <UISvg src={Assets.HomeAdvantageIconNo} className="advantage-icon_no" />
                <span>({t('advantage_tips6')})</span>
              </td>
            </tr>
            <tr>
              <td rowSpan={4}>{t('advantage_col1_3')}</td>
              <td>{t('advantage_col2_10')}</td>
              <td>
                <UISvg src={Assets.HomeAdvantageIconYes} />
              </td>
              <td>
                <UISvg src={Assets.HomeAdvantageIconYes} />
              </td>
              <td>
                <UISvg src={Assets.HomeAdvantageIconYes} />
              </td>
              <td>
                <UISvg src={Assets.HomeAdvantageIconYes} />
              </td>
            </tr>
            <tr>
              <td>{t('advantage_col2_11')}</td>
              <td>
                <UISvg src={Assets.HomeAdvantageIconYes} />
                <strong>({t('advantage_tips8')})</strong>
              </td>
              <td>
                <UISvg src={Assets.HomeAdvantageIconNo} className="advantage-icon_no" />
                <span>({t('advantage_tips9')})</span>
              </td>
              <td>
                <UISvg src={Assets.HomeAdvantageIconNo} className="advantage-icon_no" />
                <span>({t('advantage_tips9')})</span>
              </td>
              <td>
                <UISvg src={Assets.HomeAdvantageIconYes} />
                <strong>({t('advantage_tips8')})</strong>
              </td>
            </tr>
            <tr>
              <td>{t('advantage_col2_12')}</td>
              <td>
                <UISvg src={Assets.HomeAdvantageIconYes} />
              </td>
              <td>
                <UISvg src={Assets.HomeAdvantageIconYes} />
              </td>
              <td>
                <UISvg src={Assets.HomeAdvantageIconYes} />
              </td>
              <td>
                <UISvg src={Assets.HomeAdvantageIconYes} />
              </td>
            </tr>
            <tr>
              <td>{t('advantage_col2_13')}</td>
              <td>
                <UISvg src={Assets.HomeAdvantageIconYes} />
              </td>
              <td>
                <UISvg src={Assets.HomeAdvantageIconYes} />
              </td>
              <td>
                <UISvg src={Assets.HomeAdvantageIconYes} />
              </td>
              <td>
                <UISvg src={Assets.HomeAdvantageIconYes} />
              </td>
            </tr>
            <tr>
              <td rowSpan={4}>{t('advantage_col1_4')}</td>
              <td>{t('advantage_col2_14')}</td>
              <td>
                <UISvg src={Assets.HomeAdvantageIconYes} />
              </td>
              <td>
                <UISvg src={Assets.HomeAdvantageIconNo} className="advantage-icon_no" />
              </td>
              <td>
                <UISvg src={Assets.HomeAdvantageIconNo} className="advantage-icon_no" />
              </td>
              <td>
                <UISvg src={Assets.HomeAdvantageIconYes} />
              </td>
            </tr>
            <tr>
              <td>{t('advantage_col2_15')}</td>
              <td>
                <UISvg src={Assets.HomeAdvantageIconYes} />
              </td>
              <td>
                <UISvg src={Assets.HomeAdvantageIconNo} className="advantage-icon_no" />
              </td>
              <td>
                <UISvg src={Assets.HomeAdvantageIconYes} />
              </td>
              <td>
                <UISvg src={Assets.HomeAdvantageIconYes} />
              </td>
            </tr>
            <tr>
              <td>{t('advantage_col2_16')}</td>
              <td>
                <UISvg src={Assets.HomeAdvantageIconYes} />
              </td>
              <td>
                <UISvg src={Assets.HomeAdvantageIconYes} />
              </td>
              <td>
                <UISvg src={Assets.HomeAdvantageIconYes} />
              </td>
              <td>
                <UISvg src={Assets.HomeAdvantageIconYes} />
              </td>
            </tr>
            <tr>
              <td>{t('advantage_col2_17')}</td>
              <td>
                <UISvg src={Assets.HomeAdvantageIconYes} />
              </td>
              <td>
                <UISvg src={Assets.HomeAdvantageIconYes} />
              </td>
              <td>
                <UISvg src={Assets.HomeAdvantageIconYes} />
              </td>
              <td>
                <UISvg src={Assets.HomeAdvantageIconYes} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default HomeAdvantage;
