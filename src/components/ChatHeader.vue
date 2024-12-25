<script setup lang="ts">
import { ref } from 'vue';
import { NAvatar, NButton, NFlex, NGrid, NGridItem, NIcon, NText } from 'naive-ui';
import { PhoneIcon, InformationCircleIcon, ArrowLeftIcon} from '@heroicons/vue/24/outline';
import { useStore } from '../stores/store';
import { ChatType, IGroupChat, IPrivateChat } from '../models';
import { useRouter } from 'vue-router';

//TODO: avatars  

const store = useStore();
const router = useRouter();

function onAvatarClick()
{
    store.showUserInfo = !store.showUserInfo;
}

function onGoBack(){
    router.push({name: 'Chats'});
}

function getAvatarLink(): string {
    if(store.selectedChat!.type_id === ChatType.Group && (store.selectedChat as IGroupChat).avatar_url != null)
    {
        return (store.selectedChat as IGroupChat).avatar_url!;
    }
    else if(store.selectedChat!.type_id === ChatType.Private && (store.selectedChat as IPrivateChat).user.avatar_url != null)
    {
        return (store.selectedChat as IPrivateChat).user.avatar_url!;
    }
    return "";
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
        <NText depth="3" class="text-sm text-gray-500">
            lastSeenOnline
        </NText>
    </NFlex>
    <NFlex class="items-center" @click="onAvatarClick">
        <NAvatar 
            round
            :size="43"
            :src="getAvatarLink()"
        />
    </NFlex>
</NFlex>
</template>

<style>
</style>