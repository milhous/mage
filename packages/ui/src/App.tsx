import UIToolbar from '@app/toolbar';
import UIHeader from '@app/header';
import UIFooter from '@app/footer';

const App = (props: {type: number}) => {
  const {type} = props;
  let Comp = null;

  console.log('ui', type);

  switch (type) {
    case 0:
      Comp = UIToolbar;

      break;
    case 1:
      Comp = UIHeader;

      break;
    case 2:
      Comp = UIFooter;

      break;
  }

  return !!Comp ? <Comp /> : null;
};

export default App;
