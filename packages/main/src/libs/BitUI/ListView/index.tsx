import React, { useState, useEffect, useRef } from 'react';
import SVG from 'react-inlinesvg';
import { Empty } from '@app/containers/Match/components/Empty/Empty';
import { useSelector } from 'react-redux';
import i18n from '@app/i18n';
import classNames from 'classnames';
import { isEmpty } from '@app/utils/utils';

export * from './LiteListView';

export type Props = {
    dataSource: any[];
    onEndReached: () => void;
    onEndReachedThreshold?: number;
    itemRender: (item: any, index: number) => JSX.Element;
    loading: boolean;
    end: boolean;
    footerRender?: () => JSX.Element | null;
};
export function ListView(props: Props) {
    const { itemRender, footerRender, dataSource, onEndReached, loading, end } = props;
    let { onEndReachedThreshold } = props;
    const lang = useSelector((state) => (state as any).app.lang);
    const langInfo = i18n[lang].common;

    onEndReachedThreshold = onEndReachedThreshold === undefined ? 10 : onEndReachedThreshold;
    useEffect(() => {
        const fn = () => {
            if (end || loading) {
                return;
            }

            if (window.innerHeight + window.scrollY >= document.body.offsetHeight - (onEndReachedThreshold as number)) {
                onEndReached?.();
            }
        };

        window.addEventListener('scroll', fn);
        return () => window.removeEventListener('scroll', fn);
    }, [end, loading]);

    return (
        <>
            <div
                className={classNames('bit-list', {
                    'bit-list-view-empty': isEmpty(dataSource),
                })}
            >
                {!isEmpty(dataSource)
                    ? dataSource.map((item, index) => itemRender(item, index))
                    : !loading && <Empty tip={langInfo.noresult} className="bit-list-empty" />}
                {footerRender?.()}
            </div>
        </>
    );
}
