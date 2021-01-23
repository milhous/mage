import { useEffect, useState, useRef, useMemo } from 'react';

import React from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';

import './Tooltip.less';
import { useClickInside, useClickOutside } from '@app/utils/hooks';

type TooltipProps = {
    trigger?: 'click';
    children: React.ReactElement<any>;
    className?: string;
} & TooltipConProps;

let wrap: HTMLDivElement;
export function Tooltip(props: TooltipProps) {
    const { children, trigger, visible: prop_visible, ...otherProps } = props;
    const ref = useRef<HTMLElement>();
    const [visible, setVisible] = useState(false);

    if (!wrap) {
        wrap = document.createElement('div');
        document.body.appendChild(wrap);
    }

    const child = React.cloneElement(children, { ref });

    useEffect(() => {
        if (prop_visible === undefined) {
            return;
        }
        setVisible(prop_visible);
    }, [prop_visible]);

    useClickInside(
        ref,
        (e: any) => {
            if (typeof prop_visible === 'boolean') {
                return;
            }
            setVisible(!visible);
        },
        true,
    );

    useClickOutside(ref, (e: any) => {
        if (typeof prop_visible === 'boolean') {
            return;
        }
        setVisible(false);
    });

    return (
        <>
            {ReactDOM.createPortal(<TooltipCon visible={visible} {...otherProps} domRef={ref} />, wrap)}
            {child}
        </>
    );
}

type TooltipConProps = {
    title: string;
    visible?: boolean;
    position?: 'bottom' | 'left' | 'right' | 'top';
    className?: string;
};
type Style = {
    left: number;
    top: number;
};
function TooltipCon(
    props: TooltipConProps & {
        domRef: React.MutableRefObject<HTMLElement | undefined>;
    },
) {
    const { title, domRef, visible, className } = props;
    let { position } = props;
    const [style, setStyle] = useState({} as Style);
    const tipRef = useRef<HTMLDivElement>(null);

    position = position || 'top';

    useEffect(() => {
        const arrow_size = 8;
        const dom = domRef.current;
        const localDom = tipRef.current;
        if (!dom || !localDom) {
            return;
        }
        const bounds = dom.getBoundingClientRect();
        const localBounds = localDom.getBoundingClientRect();
        const { scrollTop, scrollLeft } = document.documentElement;

        let left = 0;
        let top = 0;
        if (position === 'right') {
            left = scrollLeft + bounds.left + bounds.width + arrow_size;
            top = scrollTop + bounds.top + bounds.height / 2 - localBounds.height / 2;
        } else if (position === 'top') {
            left = scrollLeft + bounds.left + (bounds.width - localBounds.width) / 2;
            top = scrollTop + bounds.top - localBounds.height - arrow_size;
        } else if (position === 'left') {
            left = scrollLeft + bounds.left - localBounds.width - arrow_size;
            top = scrollTop + bounds.top + bounds.height / 2 - localBounds.height / 2;
        } else if (position === 'bottom') {
            left = scrollLeft + bounds.left + (bounds.width - localBounds.width) / 2;
            top = scrollTop + bounds.top + bounds.height + arrow_size;
        }

        setStyle({
            left,
            top,
        });
    }, [visible, position]);

    if (!visible) {
        return null;
    }

    return (
        <div className={classnames('bit-tooltip', position, className)} ref={tipRef} style={{ ...style }}>
            <div className="bit-tooltip-content">
                <div className="bit-tooltip-arrow"></div>
                <div className="bit-tooltip-inner">
                    <span>{title}</span>
                </div>
            </div>
        </div>
    );
}
