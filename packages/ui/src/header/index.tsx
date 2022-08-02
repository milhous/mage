import './index.less';

import logo from './assets/logo.png?as=apng';

import CompNav from './components/CompNav';
import CompButtons from './components/CompButtons';

// header
const UIHeader = (): JSX.Element => {
  return (
    <div className="ui-header">
      <section>
        <aside>
          <img className="ui-header_logo" src={logo} />
        </aside>
        <article>
          <CompNav />
          <CompButtons />
        </article>
      </section>
    </div>
  );
};

export default UIHeader;
