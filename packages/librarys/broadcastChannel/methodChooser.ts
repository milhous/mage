// 原生Broadcast Channel API
import MethodBroadcastChannel from './methods/MethodBroadcastChannel';

export const chooseMethod = (): any => {
    if (MethodBroadcastChannel.canBeUsed()) {

        return MethodBroadcastChannel;
    }

    return;
};
