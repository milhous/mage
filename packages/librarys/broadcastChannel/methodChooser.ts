// 原生Broadcast Channel API
import MethodBroadcastChannel from './methods/MethodBroadcastChannel';
// 原生Localstorage API
import MethodLocalStorage from './methods/MethodLocalStorage';

export const chooseMethod = (): any => {
    if (MethodBroadcastChannel.canBeUsed()) {
        return MethodBroadcastChannel;
    } else if (MethodLocalStorage.canBeUsed()) {
        return MethodLocalStorage;
    }

    return null;
};
