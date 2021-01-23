import React, { useState } from 'react';
import classnames from 'classnames';

type TabsProps = {
    children: React.ReactNode | React.ReactNode[];
    onSelected?: (index: number) => void;
    defaultIndex?: number;
};
export function Tabs(props: TabsProps) {
    const { onSelected, defaultIndex } = props;
    let { children } = props;
    const [curIndex, setCurIndex] = useState(defaultIndex || 0);
    if (!Array.isArray(children)) {
        children = [children];
    }
    const onSelect = (index: number) => {
        setCurIndex(index);
        onSelected?.(index);
    };

    return (
        <div className="bitTabs">
            {(children as React.ReactNode[]).map((item, index) => {
                return (
                    <div
                        onClick={() => {
                            onSelect(index);
                        }}
                        className={classnames({
                            item: true,
                            cur: index === curIndex,
                        })}
                        key={index}
                    >
                        {item}
                    </div>
                );
            })}
        </div>
    );
}

type TabListProps = {
    children: React.ReactNode | React.ReactNode[];
};
export function TabList(props: TabListProps) {
    let { children } = props;
    if (!Array.isArray(children)) {
        children = [children];
    }
    return <div>{children}</div>;
}

type TabProps = {
    children: React.ReactNode | React.ReactNode[];
};
export function Tab(props: TabProps) {
    let { children } = props;
    if (!Array.isArray(children)) {
        children = [children];
    }
    return <div>{children}</div>;
}
