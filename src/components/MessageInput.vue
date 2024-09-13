<script setup lang="ts">
import { NButton, NFlex, NIcon, NInput, useNotification } from 'naive-ui';
import { PaperClipIcon, FaceSmileIcon, PaperAirplaneIcon } from '@heroicons/vue/24/outline';
import { useStore } from '../stores/store';
import { onMounted, ref } from 'vue';
import { ChatMessageTypes, convertToIChatMessage, IChatMessage, IRequest, ReadTypes } from '../models';
import { handleError, handleRequest } from '../helper';
import { useWsService } from '../services/wsServiceManager';

const store = useStore();
const wsService = useWsService();
const notification = useNotification();

function onShowEmojiPickerButtonClick() {
    store.showEmojiPicker = !store.showEmojiPicker; 
}

function onInputChange()
{
    if (store.selectedChat) {
        const { chat_id, messageText } = store.selectedChat;

        const chatInAllChats = store.allChats.find(chat => chat.chat_id === chat_id);

        if (chatInAllChats) {
            chatInAllChats.messageText = messageText;
        }
    }
}

const inputRef = ref<InstanceType<typeof NInput> | undefined>(undefined);
    
onMounted(() => {
    store.inputRef = inputRef;
});

async function onButtonSendClick()
{
    if(store.selectedChat!.messageText.length > 0){
        let newMessage: IChatMessage = {
            is_read: ReadTypes.Sending,
            sent_at: new Date(),
            text: store.selectedChat!.messageText,
            type: ChatMessageTypes.Text,
            username: store.user!.username ?? '',
            message_id: new Date().getTime()
        }

        store.selectedChat!.messageText = "";

        store.selectedChat?.messages.push(newMessage);

        store.allChats.forEach(c => {
            if (c.id_of_user_chat === store.selectedChat?.id_of_user_chat) {
                    c.last_message = newMessage;
            }
        });

        try {
            const request: IRequest  = {
                command: "SendTextMessage", 
                data: {
                    text: newMessage.text,
                    sent_at: newMessage.sent_at,
                    user_chat_id: store.selectedChat?.id_of_user_chat,
                    type_id: newMessage.type
                }
            };

            const respond = await handleRequest(wsService!, request);

            if (respond?.errorMessage) {
                handleError({ subject: "Error", body: respond?.errorMessage }, notification)
            }

            console.debug("respond", respond);

            const message_id = convertToIChatMessage(respond).message_id;
            
            store.selectedChat?.messages.forEach(msg => {
                if (msg.message_id === newMessage.message_id) {
                    msg.message_id = message_id;
                    msg.is_read = ReadTypes.Unread;
                }
            });
            
            store.allChats.forEach(c => {
                if (c.id_of_user_chat === store.selectedChat?.id_of_user_chat) {
                        c.last_message.message_id = message_id;
                }
            });

        } 
        catch (error) {
            console.error(error);
        }
        finally {
            store.loading = false;
        }
    }
}

</script>

<template>
    <NFlex class="flex flex-row p-10px b-t-#EFEFF5 b-t-solid b-t-1px w-full" :size="0" >
        <NFlex>
            <NButton :bordered="false" circle size="medium" ghost color="#898989">
                <template #icon>
                    <NIcon :size="25"><PaperClipIcon/></NIcon>
                </template>
            </NButton>
        </NFlex>
        <NFlex>
            <NButton @click="onShowEmojiPickerButtonClick" :bordered="false" circle size="medium" ghost color="#898989">
                <template #icon>
                    <NIcon :size="25"><FaceSmileIcon/></NIcon>
                </template>
            </NButton>
        </NFlex>
        <NFlex class="flex-1 m-l-10px m-r-10px">
            <NInput ref="inputRef" v-model:value="store.selectedChat!.messageText" :bordered="false" placeholder="Type your message here.." class="bg-#FAFAFA rounded-10px" @on-change="onInputChange">
                <template #suffix>
                    <NIcon/>
                </template>
            </NInput>
        </NFlex>
        <NFlex>
            <NButton :bordered="false" circle size="medium" ghost color="#007AFF" @click="onButtonSendClick">
                <template #icon>
                    <NIcon :size="25"><PaperAirplaneIcon/></NIcon>
                </template>
            </NButton>
        </NFlex>
    </NFlex>
</template>

<style>
</style>