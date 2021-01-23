import React, { CSSProperties, useCallback, useRef } from 'react';
import SVG from 'react-inlinesvg';

import iconPrev from '@app/assets/images/icons/icon-prev.svg';

import styles from './style.less';
import { useHistory } from 'react-router-dom';
import classNames from 'classnames';

type Props = {
    title: string | null;
    onPrev?: () => void;
    backNode?: React.ReactNode | false;
    children?: React.ReactNode;
    overlayClassName?: string;
    overlayStyle?: CSSProperties;
    overlayRef?: React.MutableRefObject<HTMLDivElement | null>;
};

export function Header(props: Props) {
    const { title, onPrev, backNode, children, overlayClassName, overlayStyle } = props;
    const overlayRef = props.overlayRef;
    const history = useHistory();
    const onClick = useCallback(() => {
        if (onPrev) {
            onPrev?.();
        } else {
            history.goBack();
        }
    }, [onPrev, history]);

    return (
        <div className={classNames(styles.header)}>
            <div className={styles.safeArea}></div>
            <div ref={overlayRef} style={overlayStyle} className={classNames('bit-m-header', overlayClassName)}>
                {backNode === false ? null : React.isValidElement(backNode) ? (
                    backNode
                ) : (
                    <div className="bit-m-btn-back prev" onClick={onClick}>
                        <SVG src={iconPrev} />
                    </div>
                )}
                {title}
                {children}
            </div>
        </div>
    );
}
