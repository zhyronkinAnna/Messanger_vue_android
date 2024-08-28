import { ChatType } from './ChatTypeEnum';
import { IChat } from './IChat';
import { convertToIGroupChat } from './IGroupChat';
import { convertToIPrivateChat } from './IPrivateChat';

export function convertToChat(data: any): IChat {
    debugger;
    switch (data.type_id) {
        case ChatType.Channel:
            throw new Error('Not implemented'); 
        case ChatType.Private:
            return convertToIPrivateChat(data);
        case ChatType.Group:
            return convertToIGroupChat(data);
        default:
            throw new Error('Unknown chat type');
    }
}
