<script setup lang="ts">
import { NGridItem, NGrid, NH2, NAvatar, NText, NFlex, NIcon, NButton, NInput, NCard, NForm, NFormItemGi, NDivider, NSwitch } from 'naive-ui';
import { PhoneIcon, EnvelopeIcon } from '@heroicons/vue/24/solid';
import { TrashIcon, NoSymbolIcon } from '@heroicons/vue/24/outline';
import { useStore } from '../stores/store';
import { onMounted } from 'vue';
import { ChatType, IGroupChat, IPrivateChat } from '../models';

const store = useStore();

function handleClose()
{
    store.showUserInfo = false;
}

onMounted(() => {
    
});

</script>

<template>
    <NFlex class="b-l-solid b-l-1px b-l-#EFEFF5">
        <NCard
            class="w-400px h-100vh"
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
                                        src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
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
                                            <NText class="text-#007AFF text-14px">online</NText>
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
                                placeholder="ex. Pizza lover" 
                                class="rounded-7px"
                                :disabled="true"
                                :value="
                                        store.selectedChat?.type_id === ChatType.Group ? 
                                        (store.selectedChat as IGroupChat).description : 
                                        store.selectedChat?.type_id === ChatType.Private ? 
                                        (store.selectedChat as IPrivateChat).user.description : 
                                        ''
                                "
                            />
                        </NFormItemGi>
                        <NFormItemGi :span="24">
                            <template #label>
                                <NText class="text-#007AFF text-12px">Email</NText>
                            </template>
                            <NInput 
                                placeholder="example@email.com" 
                                class="rounded-7px"
                                :disabled="true"
                                :value="
                                    store.selectedChat?.type_id === ChatType.Private ? 
                                    (store.selectedChat as IPrivateChat).user.email : 
                                    ''
                                "
                            />
                        </NFormItemGi>
                        <NFormItemGi :span="12"  :show-feedback="false" :show-label="false">
                            <NButton type="primary" block strong>
                                <template #icon>
                                    <NIcon><EnvelopeIcon/></NIcon>
                                </template>
                                Message
                            </NButton>
                        </NFormItemGi>
                        <NFormItemGi :span="12" :show-feedback="false" :show-label="false">
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
                                <NSwitch :value="store.selectedChat?.is_muted" size="medium"/>
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