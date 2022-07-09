import './index.less';

/**
 * 声明
 * @property title 标题
 * @property list 列表
 */
interface IFaqProps {
  title: string;
  list: {question: string; answer: string}[];
}

/**
 * 常见问题
 * @param {IFaqProps} props
 */
const WidgetFaq = (props: IFaqProps): JSX.Element => {
  const {title, list} = props;

  const elems: JSX.Element[] = [];

  for (let i = 0, len = list.length; i < len; i++) {
    const {question, answer} = list[i];

    elems.push(
      <li key={i}>
        <details>
          <summary>
            <i></i>
            {question}
          </summary>
          <p>{answer}</p>
        </details>
      </li>,
    );
  }
  return (
    <div className="widget-faq">
      <h3>{title}</h3>
      <ul>{elems}</ul>
    </div>
  );
};

export default WidgetFaq;
