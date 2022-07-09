import './CompNav.less';

// 导航
const CompNav = (): JSX.Element => {
  return (
    <div className="ui-footer_nav">
      <section>
        <article>
          <dl>
            <dt>賽事</dt>
            <dd>首頁</dd>
            <dd>滚球</dd>
            <dd>智能合約</dd>
            <dd>競猜細則</dd>
          </dl>
          <dl>
            <dt>遊戲</dt>
            <dd>全部</dd>
            <dd>自研</dd>
            <dd>Slots</dd>
            <dd>桌面遊戲</dd>
            <dd>真人娛樂</dd>
            <dd>虛擬體育</dd>
          </dl>
          <dl>
            <dt>優惠活動</dt>
            <dd>優惠活動</dd>
            <dd>邀請</dd>
            <dd>Affiliate</dd>
          </dl>
          <dl>
            <dt>關於我們</dt>
            <dd>平台公告</dd>
            <dd>關於Bitgame</dd>
            <dd>Bitgame新手學院</dd>
            <dd>使用條款</dd>
            <dd>隱私服務</dd>
            <dd>幣種聲明</dd>
            <dd>負責任的娛樂平台</dd>
            <dd>自我排除規則與條款</dd>
            <dd>客服郵箱:service@bitgame.com</dd>
          </dl>
        </article>
        <aside>
          <div className="ui-preferences">
            <h3>偏好設置</h3>
          </div>
          <div className="ui-footer_download">
            <h3>App下載</h3>
          </div>
        </aside>
      </section>
    </div>
  );
};

export default CompNav;
