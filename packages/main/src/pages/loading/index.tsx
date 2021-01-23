import { log } from '@app/utils/logger';
import { useEffect } from 'react';

export default function Loading() {
    useEffect(() => {
        log(`loading`);
    }, []);

    return <div>loading...</div>;
}
