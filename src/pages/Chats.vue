<script setup lang="ts">
import { NIcon, NInput, NVirtualList, NH2, NFlex, useNotification} from 'naive-ui';
import Chat from '../components/Chat.vue';
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline';
import { ChatType, convertToChat, IGroupChat, IPrivateChat, IRequest } from '../models';
import { useStore } from '../stores/store';
import { useWsService } from '../services/wsServiceManager';
import { handleError, handleRequest } from '../helper';
import { onMounted } from 'vue';
import { ref } from 'vue';
import { NDivider } from 'naive-ui';
import Menu from '../components/Menu.vue';
import Settings from '../components/Settings.vue';
import SetAvatar from '../components/SetAvatar.vue';

const store = useStore();
const wsService = useWsService();
const notification = useNotification();
const inputSearchInstRef = ref<InstanceType<typeof NInput> | undefined>(undefined);

onMounted(async () => {
    store.inputSearchInstRef = inputSearchInstRef;
    try {
        const request: IRequest = {
            command: "GetMyChats",
            data: store.user
        };

        store.loading = true;
        const respond = await handleRequest(wsService!, request);

        if (respond?.errorMessage) {
            handleError({ subject: "Sign in Error", body: respond?.errorMessage }, notification);
        }

        // Convert response data to chat objects
        store.allChats = (respond?.data as unknown as any[])?.map(item => convertToChat(item));
    } catch (error) {
        console.error(error);
    } finally {
        store.loading = false;
    }
});

async function findChats(v: string)
{
    if(v.length > 0)
    {
        try {
            const request: IRequest  = {
                command: "GetChatsByChatTitle",
                data: {
                    chat_title: v,
                    user_id: store.user?.id,
                }
            };

            const respond = await handleRequest(wsService!, request);

            if (respond?.errorMessage) {
                handleError({ subject: "Sign in Error", body: respond?.errorMessage }, notification)
            }
            
            store.findChats = [
                ...store.allChats.filter(chat =>
                    chat.type_id === ChatType.Group ? 
                    (chat as IGroupChat).chat_title?.toLowerCase().startsWith(v.toLowerCase()) :  
                    chat.type_id === ChatType.Private ? 
                    (chat as IPrivateChat).user.username?.toLowerCase().startsWith(v.toLowerCase()) : 
                    ''
                ),
                ...(respond?.data as unknown as any[])?.reduce((acc, item) => {
                    const chat = convertToChat(item);
                    if (store.selectedChat) {
                        if (
                            store.selectedChat.type_id === ChatType.Group &&
                            chat.type_id === ChatType.Group &&
                            (store.selectedChat as IGroupChat).chat_title === (chat as IGroupChat).chat_title
                        ) {
                            return acc;
                        }
                        if (
                            store.selectedChat.type_id === ChatType.Private &&
                            chat.type_id === ChatType.Private &&
                            (store.selectedChat as IPrivateChat).user.username === (chat as IPrivateChat).user.username
                        ) {
                            return acc;
                        }
                    }
                    acc.push(chat);
                    return acc;
                }, [])
            ];
        } 
        catch (error) {
            console.error(error);
        }
    }
    else
    {
        store.findChats = null
    }
}
</script>

<template>
<NFlex class="flex flex-col h-100vh w-full bg-white" :size="0" vertical>
        <NFlex  direction="horizontal" align="center" justify="space-between" class="p-l-15px p-r-15px m-b-10px">
            <NH2>Chats</NH2>
            <NFlex direction="horizontal" align="center" justify="end">
                <Menu/>
            </NFlex>
        </NFlex>
        <NFlex class="p-l-15px p-r-15px m-b-15px">
            <NInput round placeholder="Search chat" @input="findChats" ref="inputSearchInstRef">
                <template #suffix>
                    <NIcon><MagnifyingGlassIcon/></NIcon>
                </template>
            </NInput>
        </NFlex>
        <n-divider horizontal style="border-color: #ccc; border-width: 2px; height: 2px; margin: 10px 0;" />
        <NFlex class="flex-1 overflow-y-auto w-full">
            <NVirtualList :item-size="50" :items="store.findChats ? store.findChats : store.allChats">
                <template #default="{ item }">
                    <Chat :chat="item"/>
                </template>
            </NVirtualList>
        </NFlex>
        <Settings v-if="store.showSettings" class="absolute top-0 left-0 w-full h-full z-50 bg-white"/>
        <SetAvatar/>
</NFlex>
</template>

<style>
</style>