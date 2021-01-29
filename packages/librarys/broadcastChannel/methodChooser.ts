// 原生Broadcast Channel API
import MethodBroadcastChannel from './methods/MethodBroadcastChannel';
// 原生Localstorage API
import MethodLocalStorage from './methods/MethodLocalStorage';
// 原生IndexedDB API
import MethodIndexedDB from './methods/MethodIndexedDB';

export const chooseMethod = (): any => {
    if (MethodBroadcastChannel.canBeUsed()) {
        return MethodBroadcastChannel;
    } else if (MethodIndexedDB.canBeUsed()) {
        return MethodIndexedDB;
    } else if (MethodLocalStorage.canBeUsed()) {
        return MethodLocalStorage;
    }

    return null;
};
