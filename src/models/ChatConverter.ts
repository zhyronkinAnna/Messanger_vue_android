import { ChatType } from './ChatTypeEnum';
import { IChat } from './IChat';
import { IChatInfo } from './IChatInfo';
import { convertToIGroupChat } from './IGroupChat';
import { convertToIPrivateChat } from './IPrivateChat';

export function convertToChat(data: any, chatInfo?: IChatInfo): IChat {
    switch (data.type_id) {
        case ChatType.Channel:
            throw new Error('Not implemented'); 
        case ChatType.Private:
            return convertToIPrivateChat(data, chatInfo);
        case ChatType.Group:
            return convertToIGroupChat(data, chatInfo);
        default:
            throw new Error('Unknown chat type');
    }
}
