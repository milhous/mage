import { resolveAppPath, existsAppPath, resolveCliPath } from './utils.js';
import { ModeType } from './types.js';

/**
 * 声明 - 配置
 * @property VERSION 版本号
 * @method getBasicConfig 获取基础配置
 * @method getDevConfig 获取开发配置
 * @method getModuleFederationConfig 获取 Module federation 配置
 * @method init 初始化
 */
interface IBTGStore {
    VERSION: string;

    getBasicConfig(): IBasicConfig;
    getDevConfig(): IDevConfig;
    getModuleFederationConfig(): IModuleFederationConfig;

    init(config: any): Promise<void>;
}

/**
 * 声明 - 基础配置
 * @property name 应用名称
 * @property port 应用名称
 * @property src 应用源码地址
 * @property dist 应用源码生成目录
 * @property public 应用静态文件目录
 * @property cache 应用缓存目录
 */
interface IBasicConfig {
    name: string;
    port: number;
    src: string;
    dist: string;
    public: string;
    cache: string;
}

/**
 * 声明 - 开发配置
 * @property env 环境变量
 * @property mode 构建模式
 * @property analyze 生成分析报告
 * @property isDev 是否是开发环境
 * @property browserslist 目标浏览器版本范围
 */
 interface IDevConfig {
    env: string;
    mode: string;
    analyze: boolean;
    isDev: boolean;
    browserslist: string[];
}

/**
 * 声明 - Module Federation 配置
 * @property remotes 引用的远程资源包的名称与模块名称
 * @property exposes 暴露的模块
 * @property shared 共享的模块
 */
interface IModuleFederationConfig {
    remotes: IBTGStoreMFRemotes;
    exposes: IBTGStoreMFExposes;
    shared: IBTGStoreMFShared;
}

// 声明 - Module Federation Shared
interface IBTGStoreMFRemotes { [propName: string]: string; }

// 声明 - Module Federation Exposes
interface IBTGStoreMFExposes { [propName: string]: string; }

// 声明 - Module Federation Shared
interface IBTGStoreMFShared { [propName: string]: string; }

class BTGStore implements IBTGStore {
    // 版本号
    public VERSION: string = '1.0.0';
    
    // 环境变量 
    private _env: string = '';
    // 构建模式
    private _mode: string = '';
    // 是否是开发环境
    private _isDev: boolean = false;
    // 是否需要分析
    private _analyze: boolean = false;
    // browserslist 
    private _browserslist: string[] = [];
    // 应用名称
    private _appName: string = 'bitgame';
    // 应用端口号
    private _appPort: number = 3001;
    // 应用源码地址 绝对路径
    private _appSrc: string = '';
    // 应用源码生成目录 绝对路径
    private _appDist: string = '';
    // 应用静态文件目录 绝对路径
    private _appPublic: string = '';
    // 应用缓存目录 绝对路径
    private _appCache: string = '';
    // Module federation Remotes
    private _appRemotes: IBTGStoreMFRemotes = {};
    // Module federation Exposes
    private _appExposes: IBTGStoreMFExposes = {};
    // Module federation Shared
    private _appShared: IBTGStoreMFShared = {};

    constructor() { }
    
    static instance: IBTGStore = null!;

    static getInstance(): IBTGStore {
        if (!BTGStore.instance) {
            BTGStore.instance = new BTGStore();
        }

        return BTGStore.instance;
    }

    /**
     * 获取基础配置
     * @returns {IBasicConfig} 
     */
    public getBasicConfig(): IBasicConfig {
        return {
            name: this._appName,
            port: this._appPort,
            src: this._appSrc,
            dist: this._appDist,
            public: this._appPublic,
            cache: this._appCache
        }
    }

    /**
     * 获取开发配置
     * @returns {IDevConfig}
     */
    public getDevConfig(): IDevConfig {
        return {
            env: this._env,
            mode: this._mode,
            analyze: this._analyze,
            isDev: this._isDev,
            browserslist: this._browserslist
        }
    }

    /**
     * 获取 Module federation 配置
     * @returns {IModuleFederationConfig} 
     */
     public getModuleFederationConfig(): IModuleFederationConfig {
        return {
            remotes: this._appRemotes,
            exposes: this._appExposes,
            shared: this._appShared
        }
    }

    // 初始化
    public async init(args: any): Promise<void> {
        this._setDevConfig(args.env, args.mode, args.analyze);

        await this._getAppConfig();

        this._setAppPath();
    }

    /**
     * 设置开发配置
     * @param {string} env 环境变量 
     * @param {string} mode 构建模式 
     * @param {boolean} analyze 生成分析报告
     */
    private _setDevConfig(env: string, mode: string, analyze: boolean): void {
        this._env = env;
        this._mode = mode;
        this._analyze = analyze;
        this._isDev = mode === ModeType.DEVELOPMENT;
        this._browserslist = this._isDev ? [
            'last 1 chrome version',
            'last 1 firefox version',
            'last 1 safari version',
            'last 1 ie version'
        ] : [
            'last 1 version',
            '> 1%',
            'maintained node versions',
            'not dead'
        ];
    }

    // 获取App配置
    private async _getAppConfig(): Promise<void> {
        const appConfigPath = resolveAppPath('./btg.config.js');
        const isExist = await existsAppPath('./btg.config.js');

        if (isExist) {
            const module = await import(appConfigPath);
            const config = module.default();

            this._appName = config.name;
            this._appPort = config.port;

            this._appRemotes = config.remotes;
            this._appExposes = config.exposes;
            this._appShared = config.shared;
        }
    }

    // 设置App路径
    private _setAppPath(): void {
        this._appSrc = resolveAppPath('./src');
        this._appDist = resolveAppPath('./dist');
        this._appCache = resolveAppPath('./.cache/webpack');
        this._appPublic = resolveCliPath('./public');
    }
}

// 定义全局变量
const store: IBTGStore = BTGStore.getInstance();

export default store;