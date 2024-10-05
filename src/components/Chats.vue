<script setup lang="ts">
import { NIcon, NInput, NVirtualList, NH2, NFlex, useNotification } from 'naive-ui';
import Chat from './Chat.vue';
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline';
import { ChatType, convertToChat, IGroupChat, IPrivateChat, IRequest } from '../models';
import { useStore } from '../stores/store';
import { useWsService } from '../services/wsServiceManager';
import { handleError, handleRequest } from '../helper';
import { onMounted } from 'vue';
import { ref } from 'vue';

const store = useStore();
const wsService = useWsService();
const notification = useNotification();
const inputSearchInstRef = ref<InstanceType<typeof NInput> | undefined>(undefined);

onMounted(async ()=>{
    store.inputSearchInstRef = inputSearchInstRef;
    try {
        const request: IRequest  = {
            command: "GetMyChats", 
            data: store.user
        };

        store.loading = true;
        const respond = await handleRequest(wsService!, request);

        if (respond?.errorMessage) {
            handleError({ subject: "Sign in Error", body: respond?.errorMessage }, notification)
        }

        console.debug("respond", respond);
        store.allChats = (respond?.data as unknown as any[])?.map(item => 
          convertToChat(item)
        );
    } 
    catch (error) {
        console.error(error);
    }
    finally {
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

            console.debug("respond", respond);
            
            store.findChats = [
                ...store.allChats.filter(chat =>
                    chat.type_id === ChatType.Group ? 
                    (chat as IGroupChat).chat_title?.toLowerCase().includes(v.toLowerCase()) : 
                    chat.type_id === ChatType.Private ? 
                    (chat as IPrivateChat).user.username?.toLowerCase().includes(v.toLowerCase()) : 
                    ''
                ),
                ...(respond?.data as unknown as any[])?.map(item => 
                    convertToChat(item)
                )
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
    <NFlex class="flex flex-col h-100vh" :size="0" vertical>
        <NFlex class="p-l-15px p-r-15px m-b-5px m-t-8px">
            <NH2>Chats</NH2>
        </NFlex>
        <NFlex class="p-l-15px p-r-15px m-b-15px">
            <NInput round placeholder="Search chat" @input="findChats" ref="inputSearchInstRef">
                <template #suffix>
                    <NIcon><MagnifyingGlassIcon/></NIcon>
                </template>
            </NInput>
        </NFlex>
        <NFlex class="flex-1 overflow-y-auto">
            <NVirtualList :item-size="50" :items="store.findChats ? store.findChats : store.allChats">
                <template #default="{ item }">
                    <Chat :chat="item"/>
                </template>
            </NVirtualList>
        </NFlex>
    </NFlex>
</template>

<style>
</style>