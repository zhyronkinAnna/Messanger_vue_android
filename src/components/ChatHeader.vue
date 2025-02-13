<script setup lang="ts">
import { NAvatar, NButton, NFlex, NIcon, NText } from 'naive-ui';
import { ArrowLeftIcon} from '@heroicons/vue/24/outline';
import { useStore } from '../stores/store';
import { ChatType, IGroupChat, IPrivateChat } from '../models';
import { useRouter } from 'vue-router';

 
// Initialize the store
const store = useStore();
const router = useRouter();

function onAvatarClick()
{
    store.showUserInfo = !store.showUserInfo;
}

function onGoBack(){
    router.push({name: 'Chats'});
    store.selectedChat = null;
}
</script>

<template>
<NFlex class="w-full bg-white p-t-5px p-b-5px b-b-1px b-b-solid b-b-#EFEFF5" justify="space-around" horizontal>
    <NFlex align="center">
        <NButton :bordered="false" @click="onGoBack" size="medium" ghost color="#007AFF" style="padding: 0;">
            <template #icon>
                    <NIcon :size="23"><ArrowLeftIcon/></NIcon>
            </template>
        </NButton>
    </NFlex>
    <NFlex vertical :size="2" align="center">
        <NText strong>
            {{
                store.selectedChat?.type_id === ChatType.Group ? 
                (store.selectedChat as IGroupChat).chat_title : 
                store.selectedChat?.type_id === ChatType.Private ? 
                (store.selectedChat as IPrivateChat).user.username : 
                ''
            }}
        </NText>
        <!-- <NText depth="3" class="text-sm text-gray-500">
            {{
                store.selectedChat?.onlineStatus ?? "lastSeenOnline"
            }}
        </NText> -->
        <NText depth="3" class="text-sm text-gray-500">
            12.02.2025
        </NText>
    </NFlex>
        <NAvatar 
            round
            :size="43"
            :src="store.selectedChat.type_id === ChatType.Group ? (store.selectedChat as IGroupChat).avatar_url! : 
                store.selectedChat!.type_id === ChatType.Private ? (store.selectedChat as IPrivateChat).user.avatar_url! : ''"
            @click="onAvatarClick"
        />
</NFlex>
</template>

<style>
</style>