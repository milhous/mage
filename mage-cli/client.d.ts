// files
declare module '*.svga' {
  const src: string;
  export default src;
}

declare module '*.avif' {
  const src: string;
  export default src;
}

declare module '*.bmp' {
  const src: string;
  export default src;
}

declare module '*.gif' {
  const src: string;
  export default src;
}

declare module '*.jpg' {
  const src: string;
  export default src;
}

declare module '*.jpeg' {
  const src: string;
  export default src;
}

declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.webp' {
  const src: string;
  export default src;
}

declare module '*.svg' {
  const src: string;
  export default src;
}

// styles
declare module '*.module.css' {
  const classes: {[key: string]: string};
  export default classes;
}

declare module '*.module.less' {
  const classes: {[key: string]: string};
  export default classes;
}

// web worker
declare module '*?worker' {
  const workerConstructor: {
    new (): Worker;
  };
  export default workerConstructor;
}

declare module '*?inline' {
  const inlineStr: string;
  export default inlineStr;
}

// svga.lite
declare module 'svga.lite/db';
