<script setup lang="ts">
import { NGridItem, NGrid, NH2, NAvatar, NText, NFlex, NIcon, NButton, NInput, NCard, NForm, NFormItemGi, NDivider, NSwitch, useNotification } from 'naive-ui';
import { PhoneIcon, EnvelopeIcon } from '@heroicons/vue/24/solid';
import { TrashIcon, NoSymbolIcon } from '@heroicons/vue/24/outline';
import { useStore } from '../stores/store';
import { onMounted, ref } from 'vue';
import { ChatType, convertToChat, convertToIChatInfo, IGroupChat, IPrivateChat, IRequest } from '../models';
import { handleError, handleRequest } from '../helper';
import { useWsService } from '../services/wsServiceManager';

const store = useStore();
const wsService = useWsService();
const notification = useNotification();
const bio = ref<string | undefined>(
    store.selectedChat?.type_id === ChatType.Group 
        ? (store.selectedChat as IGroupChat).description 
        : (store.selectedChat as IPrivateChat)?.user.description
);

function handleClose()
{
    store.showUserInfo = false;
}

async function onUpdateMuted()
{
    store.selectedChat!.is_muted = !store.selectedChat!.is_muted;

    const request: IRequest  = {
        command: "UpdateIsMuted", 
        data: {
            id: store.selectedChat?.id_of_user_chat,
            is_muted: store.selectedChat!.is_muted
        }
    };
    handleRequest(wsService!, request, false);
}

onMounted(async ()=>{
    try {
        store.selectedChat!.is_muted_view = !store.selectedChat!.is_muted;
        
        if((store.selectedChat!.type_id === ChatType.Private && 
            ((store.selectedChat as IPrivateChat).user!.email == null || (store.selectedChat as IPrivateChat).user!.email === "")))
        {
            const request: IRequest  = {
                command: "GetChatInfo", 
                data: {
                    chat_id: store.selectedChat?.chat_id,
                    user_id: store.user?.id
                }
            };

            const respond = await handleRequest(wsService!, request);

            if (respond?.errorMessage) {
                handleError({ subject: "Sign in Error", body: respond?.errorMessage }, notification)
            }

            store.selectedChat = convertToChat(store.selectedChat, convertToIChatInfo(respond?.data));
            
            bio.value = store.selectedChat?.type_id === ChatType.Group ? 
                (store.selectedChat as IGroupChat).description : 
                store.selectedChat?.type_id === ChatType.Private ? 
                (store.selectedChat as IPrivateChat).user.description : 
                '' 
        }
    } 
    catch (error) {
        console.error(error);
    }
})

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

// function onButtonMessageClick(){
//     if (store.inputRef) {
//         store.inputRef.focus();
//     }
// };

</script>

<template>
    <NFlex class="b-l-solid b-l-1px b-l-#EFEFF5">
        <NCard
            class="w-full h-100vh"
            :bordered="false"
            closable 
            @close="handleClose"
            size="huge"
            role="dialog"
            aria-modal="true"
            :theme-overrides="{
                paddingHuge: '12px 20px 20px'
            }" 
        >
            <template #header>
                <NH2>User info</NH2>
            </template>
            <NFlex direction="column" class="h-full w-full">
                <NForm class="w-full">
                    <NGrid :cols="24" :x-gap="10" >
                        <NFormItemGi :span="24" :show-label="false">
                            <NFlex class="w-full items-center">
                                <NFlex>
                                    <NAvatar 
                                        round
                                        :size="60"
                                        :src="getAvatarLink()"
                                    />
                                </NFlex>
                                <NFlex>
                                    <NGrid :cols="1">
                                        <NGridItem>
                                            <NText strong>
                                            {{ 
                                                store.selectedChat?.type_id === ChatType.Group ? 
                                                (store.selectedChat as IGroupChat).chat_title : 
                                                store.selectedChat?.type_id === ChatType.Private ? 
                                                (store.selectedChat as IPrivateChat).user.username : 
                                                '' 
                                            }}
                                            </NText>
                                        </NGridItem>
                                        <NGridItem>
                                            <NText 
                                                :class="{ 'text-#007AFF text-14px': store.selectedChat?.onlineStatus === 'Online' }">
                                                {{ store.selectedChat?.onlineStatus ?? "" }}
                                            </NText>
                                        </NGridItem>
                                    </NGrid>
                                </NFlex>
                            </NFlex>
                        </NFormItemGi>
                        <NFormItemGi :span="24">
                            <template #label>
                                <NText class="text-#007AFF text-12px">Bio</NText>
                            </template>
                            <NInput
                                class="rounded-7px"
                                 placeholder="Bio is currently empty."
                                :disabled="true"
                                :value="bio"
                                :loading="undefined === bio"
                            />
                        </NFormItemGi>
                        <NFormItemGi v-if="store.selectedChat?.type_id === ChatType.Private" :span="24" >
                            <template #label>
                                <NText class="text-#007AFF text-12px">Email</NText>
                            </template>
                            <NInput 
                                class="rounded-7px"
                                :disabled="true"
                                :value="
                                    store.selectedChat?.type_id === ChatType.Private ? 
                                    (store.selectedChat as IPrivateChat).user.email : 
                                    ''
                                "
                                :loading="store.selectedChat?.type_id === ChatType.Private && 
                                        (store.selectedChat as IPrivateChat).user.email == null"  
                            />
                        </NFormItemGi>
                        <NFormItemGi :span="24" :show-feedback="false" :show-label="false">
                            <NButton type="primary" block strong>
                                <template #icon>
                                    <NIcon><PhoneIcon/></NIcon>
                                </template>
                                Call
                            </NButton>
                        </NFormItemGi>
                        <NFormItemGi :span="24" :show-feedback="false" :show-label="false">
                            <NDivider/>
                        </NFormItemGi>
                        <NFormItemGi :span="24" :show-feedback="false" :show-label="false">
                            <NFlex justify="space-between" class="w-full">
                                <NText>Notifications</NText>
                                <NSwitch v-model:value="store.selectedChat!.is_muted_view" @update:value="onUpdateMuted" size="medium" />
                            </NFlex>
                        </NFormItemGi>
                    </NGrid>
                </NForm>
                <NFlex justify="space-between" class="w-full p-4 mt-auto">
                    <NButton text type="primary" text-color="#FF0000" size="large">
                        <template #icon>
                            <NIcon><TrashIcon/></NIcon>
                        </template>
                        Delete chat
                    </NButton>
                    <NButton text type="primary" text-color="#FF0000" size="large">
                        <template #icon>
                            <NIcon><NoSymbolIcon/></NIcon>
                        </template>
                        Block user
                    </NButton>
                </NFlex>
            </NFlex>
        </NCard>
    </NFlex>
</template>

<style>
</style>