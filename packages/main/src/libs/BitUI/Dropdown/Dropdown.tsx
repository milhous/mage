import React, { useEffect, useState, useRef, useMemo } from 'react';
import ReactDOM from 'react-dom';

import './Dropdown.less';
import { useClickInside, useClickOutside } from '@app/utils/hooks';

type DropdownProps = {
    onVisibleChange?: (visible: boolean) => void;
    visible: boolean;
    children: React.ReactElement<any>;
    overlay: React.ReactElement<any>;
};
let wrap: HTMLDivElement;
export function Dropdown(props: DropdownProps) {
    const { children, visible, onVisibleChange, ...otherProps } = props;
    const ref = useRef<HTMLElement>();
    const child = React.cloneElement(children, { ref });

    if (!wrap) {
        wrap = document.createElement('div');
        document.body.appendChild(wrap);
    }

    useClickInside(
        ref,
        (e: any) => {
            onVisibleChange?.(!visible);
        },
        true,
    );
    useClickOutside(ref, (e: any) => {
        onVisibleChange?.(false);
    });

    return (
        <>
            {ReactDOM.createPortal(<DropdownCon domRef={ref} {...otherProps} visible={visible} />, wrap)}
            {child}
        </>
    );
}

type DropdownConProps = {
    visible: boolean;
    overlay: React.ReactElement<any>;
};
type Style = {
    left: number;
    top: number;
};
function DropdownCon(
    props: DropdownConProps & {
        domRef: React.MutableRefObject<HTMLElement | undefined>;
    },
) {
    const { domRef, visible, overlay } = props;
    const [style, setStyle] = useState({} as Style);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!visible) {
            return;
        }
        const dom = domRef.current;
        const localDom = ref.current;
        if (!dom || !localDom) {
            return;
        }
        const bounds = dom.getBoundingClientRect();
        const localBounds = localDom.getBoundingClientRect();

        setStyle({
            left: bounds.left + (bounds.width - localBounds.width) / 2,
            top: bounds.top + bounds.height + 5 + document.documentElement.scrollTop,
        });
    }, [visible]);

    if (!visible) {
        return null;
    }

    return (
        <div ref={ref} className="bit-dropdown" style={style}>
            {overlay}
        </div>
    );
}
