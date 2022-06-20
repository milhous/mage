import './index.less';

import logo from './assets/logo.png';
import importSvg from './assets/import.svg?url';
import assume from './assets/assume.png';

// header
const UIHeader = (): JSX.Element => {
  return (
    <div className="ui-header">
      <section>
        <aside>
          <img src={logo} />
        </aside>
        <article>222</article>
      </section>
    </div>
  );
};

export default UIHeader;
