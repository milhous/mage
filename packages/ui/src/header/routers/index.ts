import {BetType} from '@libs/config';

// 路由配置
const routers = {
  [BetType.ACCOUNT]: [
    {name: 'match', to: '/match', key: 'Sports', desc: '点击中心化赛事按钮'},
    {name: 'games', to: '/game', key: 'Game', desc: '点击游戏按钮'},
    {
      name: 'staking',
      to: '/staking',
      key: 'LuckyToken',
      desc: '点击幸运币按钮',
      children: [
        {name: 'stakingLut', to: '/staking/about', key: 'LUT_AboutLUT', desc: '点击关于LUT切页'},
        {name: 'stakingMining', to: '/staking/mining', key: 'LUT_PredictiveMining', desc: '点击预测挖矿切页'},
        {
          name: 'stakingDividends',
          to: '/staking/dividends',
          key: 'LUT_HoldingDividends',
          desc: '点击持币分红切页',
        },
        {name: 'stakingBidding', to: '/staking/bidding', key: 'LUT_Auction', desc: '点击竞标切页'},
        {
          name: 'stakingLuckyBingo',
          to: '/staking/bingo',
          key: 'LUT_Bingo',
          desc: '点击Bingo切页',
          hide: true,
        },
      ],
    },
    {name: 'promotions', to: '/promotions', key: 'Promotions', desc: '点击活动按钮'},
    {
      name: 'vip',
      to: '/user/vip',
      key: 'VIP',
      desc: '点击VIP按钮',
      children: [
        {name: 'vip:link_my_vip', to: '/user/vip', key: 'VIP_MyVIP', desc: '点击我的VIP切页'},
        {name: 'vip:link_about_vip', to: '/about/vip', key: 'VIP_AboutVIP', desc: '点击关于VIP切页'},
      ],
    },
    {
      name: 'referral',
      to: '/referral',
      key: 'Referral',
      desc: '点击邀请按钮',
    },
    {
      name: 'affiliate',
      to: '/affiliate',
      key: 'Affiliate',
      desc: '点击代理按钮',
    },
    {name: 'footer:app_download', to: '/app', key: 'app_download', desc: '点击app下载按钮'},
    // { name: 'christmas', to: '/promotions/christmas', key: 'Christmas', desc: '点击圣诞活动' },
  ],
  [BetType.CONTRACT]: [
    {name: 'smart_contract', to: '/contract', key: 'Blocksports', desc: '点击合约赛事按钮'},
    {
      name: 'staking',
      to: '/lut',
      key: 'LuckyToken',
      desc: '点击幸运币按钮',
    },
  ],
};

export default routers;
