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
 * 声明 - 授权
 * @method init 初始化
 * @method clear 清理
 * @method getAccessToken 获取用户令牌
 * @method getAuthorization 获取平台授权码（默认不需要token)
 */
declare interface IAuth {
  init(props: IAuthInitProps): void;
  clear(): void;
  getAccessToken(): string | undefined;
  getAuthorization(isToken?: boolean): string;
}
