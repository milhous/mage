import React, {useEffect, useState} from 'react';
import {Downloader, Parser, Player, EVENT_TYPES, VideoEntity} from 'svga.lite';
import DB from 'svga.lite/db';

// 数据集合
const dataMap: Map<string, VideoEntity> = new Map();
// IndexedDB
let db: any = null;

try {
  db = new DB();
} catch (error) {
  console.error(error);
}

/**
 * 通过下载获取播放数据
 * @param {string} file 文件
 */
const getDataWidthDownLoader = async (file: string): Promise<any> => {
  let data = null;

  if (dataMap.has(file)) {
    data = dataMap.get(file);
  } else {
    const downloader = new Downloader();
    const parser = new Parser();
    const fileData = await downloader.get(file);
    data = await parser.do(fileData);

    dataMap.set(file, data);

    downloader.destroy();
    parser.destroy();
  }

  return data;
};

/**
 * 通过IndexedDB获取数据
 * @param {string} file 文件
 */
const getDataWidthDB = async (file: string): Promise<any> => {
  let data = await db.find(file);

  if (!data) {
    data = await getDataWidthDownLoader(file);

    await db.insert(file, data);
  }

  return data;
};

/**
 * 播放
 * @param {Player} params.player 播放器
 * @param {string} params.file 文件
 * @param {string} params.id 唯一标识
 * @param {number} params.loop 循环次数
 * @param {function} params.onStart 开始播放事件
 * @param {function} params.onEnd 结束播放事件
 */
const play = async (params: {
  player: Player;
  file: string;
  id: string;
  loop?: number;
  onStart?: (ele: HTMLCanvasElement) => void;
  onEnd?: () => void;
  onProcess?: (progress: number) => void;
}): Promise<void> => {
  const {player, file, id = '', loop = 0, onStart, onEnd, onProcess} = params;

  let data = null;

  if (!!db) {
    data = await getDataWidthDB(file);
  } else {
    data = await getDataWidthDownLoader(file);
  }

  // 监听 - 播放开始
  if (typeof onStart === 'function') {
    player.$on(EVENT_TYPES.START, () => {
      onStart(document.getElementById(id) as HTMLCanvasElement);
    });
  }

  // 监听 - 播放结束
  if (typeof onEnd === 'function') {
    player.$on(EVENT_TYPES.END, () => {
      onEnd();
    });
  }

  // 监听 - 播放结束
  if (typeof onProcess === 'function') {
    player.$on(EVENT_TYPES.PROCESS, () => {
      onProcess(player.progress);
    });
  }

  // 设置播放配置
  player.set({loop, cacheFrames: false, intersectionObserverRender: true});

  // 清空动画
  player.clear();

  // 设置播放数据
  await player.mount(data);

  player.start();
};

/**
 * 获取UUID
 * @return {string} uuid
 */
const uuid = (): string => {
  return 'r' + Math.random().toString(16).replace('0.', '');
};

type Props = {
  className?: string;
  url: string;
  ref?: React.MutableRefObject<HTMLCanvasElement>;
  time?: number;
  onProcess?: (progress: number) => void;
  onEnd?: () => void;
  onStart?: (ele: HTMLCanvasElement) => void;
};

const Svga = (props: Props) => {
  const {url, ref, time = 0, onEnd, onStart, onProcess, ...otherProps} = props;
  const [id, setId] = useState<string>(uuid());
  const [player, setPlayer] = useState<Player | null>(null);

  useEffect(() => {
    setPlayer(new Player(`#${id}`));

    return () => {
      !!player && player.destroy();
    };
  }, []);

  useEffect(() => {
    if (!!player) {
      play({
        player,
        id,
        file: url,
        loop: time,
        onStart,
        onEnd,
        onProcess,
      });
    }
  }, [url, id, player, time]);

  return <canvas className="widget-svga" ref={ref} id={id}></canvas>;
};

export default Svga;
