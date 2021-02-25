import styles from './style.less';

export default function getClass(className) {
  return (styles && styles[className]) ? styles[className] : className;
}