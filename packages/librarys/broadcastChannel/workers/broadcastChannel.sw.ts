import { precacheAndRoute } from 'workbox-precaching';
import { clientsClaim } from 'workbox-core';

// Your other import statements go here

const initialize = (service: ServiceWorkerGlobalScope): void => {
    precacheAndRoute((self as any).__WB_MANIFEST);

    // 一旦激活就开始控制任何现有客户机
    clientsClaim();
    // 跳过等待期
    service.skipWaiting();

    service.addEventListener('message', evt => {
        service.clients.matchAll().then(function(clients) {
            clients.forEach(function(client) {
            client.postMessage(evt.data);
            });
        });
    });
}

initialize(self as any)