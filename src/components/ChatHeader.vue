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
            src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
        />
    </NFlex>
</NFlex>
</template>

<style>
</style>