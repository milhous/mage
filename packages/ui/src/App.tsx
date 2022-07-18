import {UIType} from '@libs/types';

import UIToolbar from '@app/toolbar';
import UIHeader from '@app/header';
import UIFooter from '@app/footer';
import UILanguages from '@app/languages';
import UITimezone from '@app/timezone';

const App = (props: {type: number}) => {
  const {type} = props;
  let Comp = null;

  switch (type) {
    case UIType.TOOLBAR:
      Comp = UIToolbar;

      break;
    case UIType.HEADER:
      Comp = UIHeader;

      break;
    case UIType.FOOTER:
      Comp = UIFooter;

      break;
    case UIType.LANGUAGES:
      Comp = UILanguages;

      break;
    case UIType.TIMEZONE:
      Comp = UITimezone;

      break;
  }

  return !!Comp ? <Comp /> : null;
};

export default App;
