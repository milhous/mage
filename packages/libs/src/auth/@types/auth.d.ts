/**
 * @property accessToken 用户令牌
 * @property refreshToken 刷新令牌
 * @property exp 令牌有效期
 * @property walletAddress 钱包类型
 * @property walletType 钱包地址
 */
interface IAuthInitProps {
  accessToken: string;
  refreshToken?: string;
  exp: string | number;
  walletAddress?: string;
  walletType?: string;
}

/**
 * 声明 - 基于帧率计时器
 * @method check 根据uuid检测计时器是否存在
 * @method update 更新
 * @method timer 计时器
 * @method frame 帧计时
 * @method clear 根据uuid清理
 * @method clearByGroup 根据分组名称清理
 * @method clearAll 清理所有
 */
declare interface IAuth {
  init(props: IAuthInitProps): void;
  clear(): void;
}
