import React, { useState, useEffect, useRef } from 'react';
import { ListView } from '.';
import SVG from 'react-inlinesvg';
import loadingSVG from '@app/assets/images/icons/loading.svg';

type LiteListViewProps<T> = {
    pageSize: number;
    footerRender?: () => JSX.Element | null;
    itemRender: (item: any, index: number) => JSX.Element;
    request: (pageInfo: LiteListViewPageParams) => Promise<LiteListViewRequestRepType<T>> | undefined;
    deps?: any[];
};
export interface LiteListViewRequestRepType<T> {
    list?: T[];
    end?: boolean;
}
export type LiteListViewPageParams = {
    pageNum: number;
    pageSize: number;
};
export function LiteListView<T extends any>({
    pageSize,
    deps = [],
    footerRender,
    itemRender,
    request,
}: LiteListViewProps<T>) {
    const [pageParams, setPageParams] = useState({
        pageNum: -1,
        pageSize,
    } as LiteListViewPageParams);
    const [loading, setLoading] = useState(false);
    const [end, setEnd] = useState(false);
    const [data, setData] = useState<T[]>([]);

    const defaultFootRender = () => {
        if (loading) {
            return <div className="loading">{<SVG src={loadingSVG} />}</div>;
        } else {
            return null;
        }
    };

    useEffect(() => {
        setEnd(false);
        setLoading(false);
        setPageParams({ pageNum: 1, pageSize: 10 });
        setData([]);
    }, [...deps]);

    useEffect(() => {
        if (pageParams.pageNum === -1) return;
        request({ ...pageParams })?.then(({ list, end }) => {
            if (list) {
                setData([...data, ...list]);
            }
            if (end) {
                setEnd(end);
            }
        });
        setLoading(true);
    }, [pageParams]);

    return (
        <ListView
            loading={loading}
            end={end}
            dataSource={data}
            onEndReached={() =>
                setPageParams({
                    ...pageParams,
                    pageNum: pageParams.pageNum + 1,
                })
            }
            footerRender={footerRender || defaultFootRender}
            itemRender={itemRender}
        />
    );
}
