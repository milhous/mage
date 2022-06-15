import {useTransition, useState, useEffect} from 'react';

/**
 * 声明
 * @param {string} dir 目录
 * @param {string} name 名称
 * @param {string} suffix 后缀
 */
interface IUIDynamicImgProps {
  dir: string;
  name: string;
  suffix: string;
}

/**
 * 动态图片
 * @param {IUIDynamicImgProps} props 参数
 * @returns
 */
const UIDynamicImg = (props: IUIDynamicImgProps): JSX.Element => {
  const {dir, name, suffix} = props;
  const [isPending, startTransition] = useTransition();
  const [src, setSrc] = useState('');

  useEffect(() => {
    startTransition(() => {
      (async () => {
        let moudle: any = null;
        const path = dir + name;

        // 后缀固定，解决 Critical dependency: the request of a dependency is an expression
        switch (suffix) {
          case 'png':
            moudle = await import(`${path}.png`);

            break;
          case 'jpg':
            moudle = await import(`${path}.jpg`);

            break;
          case 'svg':
            moudle = await import(`${path}.svg?url`);

            break;
        }

        if (!!moudle) {
          setSrc(moudle.default);
        }
      })();
    });
  }, []);

  return <>{!isPending && <img src={src} />}</>;
};

export default UIDynamicImg;
