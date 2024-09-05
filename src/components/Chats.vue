<script setup lang="ts">
import { NIcon, NInput, NVirtualList, NH2, NFlex, useNotification } from 'naive-ui';
import Chat from './Chat.vue';
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline';
import { convertToChat, IRequest } from '../models';
import { useStore } from '../stores/store';
import { useWsService } from '../services/wsServiceManager';
import { handleError, handleRequest } from '../helper';
import { onMounted } from 'vue';

const store = useStore();
const wsService = useWsService();
const notification = useNotification();

onMounted(async ()=>{
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
})
</script>

<template>
    <NFlex class="flex flex-col h-100vh" :size="0" vertical>
        <NFlex class="p-l-15px p-r-15px m-b-5px m-t-8px">
            <NH2>Chats</NH2>
        </NFlex>
        <NFlex class="p-l-15px p-r-15px m-b-15px">
            <NInput round placeholder="Search chat">
                <template #suffix>
                    <NIcon><MagnifyingGlassIcon/></NIcon>
                </template>
            </NInput>
        </NFlex>
        <NFlex class="flex-1 overflow-y-auto">
            <NVirtualList :item-size="50" :items="store.allChats">
                <template #default="{ item }">
                    <Chat :chat="item"/>
                </template>
            </NVirtualList>
        </NFlex>
    </NFlex>
</template>

<style>
</style>