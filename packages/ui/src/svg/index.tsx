import {Suspense} from 'react';
import SVG from 'react-inlinesvg';

/**
 * 声明
 * @param {string} src 来源
 * @param {string} className 类名
 */
interface ISvgProps {
  src: string;
  className?: string;
}

/**
 * Svg
 * @param {ISvgProps} props
 * @returns {JSX.Element}
 */
const Svg = (props: ISvgProps): JSX.Element => {
  const {src, className = ''} = props;

  return (
    <Suspense>
      <SVG src={src} className={className} />
    </Suspense>
  );
};

export default Svg;
