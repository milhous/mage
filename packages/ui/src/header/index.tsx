import './index.less';

import logo from './assets/logo.png?as=apng';

import CompNav from './components/CompNav';

// header
const UIHeader = (): JSX.Element => {
  return (
    <div className="ui-header">
      <section>
        <aside>
          <img src={logo} />
        </aside>
        <article>
          <CompNav />
        </article>
      </section>
    </div>
  );
};

export default UIHeader;
