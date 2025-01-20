<script setup lang="ts">
import { NButton, NFlex, NIcon, NInput, NUpload, UploadFileInfo, useNotification } from 'naive-ui';
import { PaperClipIcon, FaceSmileIcon, PaperAirplaneIcon, ChevronDoubleLeftIcon } from '@heroicons/vue/24/outline';
import { useStore } from '../stores/store';
import { onMounted, ref } from 'vue';
import { ChatMessageTypes, ChatType, convertToChat, convertToIChatMessage, IChat, IChatMessage, 
    IGroupChat, IPrivateChat, IRequest, ReadTypes } from '../models';
import { fileToBase64, formatFileSize, handleError, handleRequest } from '../helper';
import { useWsService } from '../services/wsServiceManager';

//TODO: send file

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

async function handleKeyDownEnter(event: KeyboardEvent)
{
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        await onButtonSendClick(); 
    } else {
        return;
    }
}

async function onChange(options: { file: UploadFileInfo; fileList: Array<UploadFileInfo> }) {
    if (options.file.status === "pending") {
        const file = options.file.file;
        if (file) {
            let newMessage: IChatMessage = {
                is_read: ReadTypes.Sending,
                sent_at: new Date(),
                file_title: file.name,
                type: ChatMessageTypes.File,
                username: store.user!.username ?? '',
                message_id: Math.floor(new Date().getTime()),
                file_size: formatFileSize(file.size)
            }
            store.selectedChat!.messages.push(newMessage);
            store.selectedChat!.last_message = newMessage;
            const request = {
                    command: "SendFileMessage", 
                    data: {
                        sent_at: newMessage.sent_at,
                        user_chat_id: store.selectedChat?.id_of_user_chat,
                        type_id: newMessage.type,
                        file: await fileToBase64(file),
                        title: newMessage.file_title,
                        size: newMessage.file_size
                    }
                };
            
            const respond = await handleRequest(wsService!, request);
            if (respond?.errorMessage) {
                handleError({ subject: "Error", body: respond?.errorMessage }, notification)
            }
            const message_id = convertToIChatMessage(respond!.data).message_id;
            store.selectedChat?.messages.forEach(msg => {
                if (msg.message_id === newMessage.message_id) {
                    msg.message_id = message_id;
                    msg.is_read = ReadTypes.Unread;
                }
            });
            store.allChats.forEach(c => {
                if (c.id_of_user_chat === store.selectedChat?.id_of_user_chat) {
                    c.last_message.message_id = message_id;
                    c.messages.forEach(msg => {
                        if (msg.message_id === newMessage.message_id) {   
                            msg.message_id = message_id;
                            msg.is_read = ReadTypes.Unread;
                        }
                    });
                    
                    store.virtualListMessagesInst.scrollTo({ position: 'bottom' });
                    moveElementToStart(store.allChats, store.selectedChat!);
                    store.loading = false;
                    return
                }
            });
        } else {
            console.error('File is null or undefined');
        }
    }
    console.log(options.file);
}

function moveElementToStart(arr: IChat[], element: IChat) {
    const index = arr.indexOf(element);
    
    if (index !== -1) { 
        arr.splice(index, 1);
        arr.unshift(element);
    }
}

async function onButtonSendClick()
{
    if(store.selectedChat!.messageText.length > 0){
        let newMessage: IChatMessage = {
            is_read: ReadTypes.Sending,
            sent_at: new Date(),
            text: store.selectedChat!.messageText,
            type: ChatMessageTypes.Text,
            username: store.user!.username ?? '',
            message_id: Math.floor(new Date().getTime())
        }

        store.selectedChat!.messageText = "";

        store.selectedChat?.messages.push(newMessage);

        store.allChats.forEach(c => {
            if (c.id_of_user_chat === store.selectedChat?.id_of_user_chat) {
                    c.last_message = newMessage;
            }
        });

        try {
            let request: IRequest;
            if(store.selectedChat?.id_of_user_chat == null){
                request = {
                    command: "SendTextMessageAndAddNewChat", 
                    data: {
                        senderId: store.user?.id,
                        receiverUsername: (store.selectedChat as IPrivateChat)?.user.username,
                        text: newMessage.text,
                        sent_at: newMessage.sent_at,
                        type_id: newMessage.type
                    }
                };

                const respond = await handleRequest(wsService!, request);

                if (respond?.errorMessage) {
                    handleError({ subject: "Error", body: respond?.errorMessage }, notification)
                }

                const message_id = convertToIChatMessage(respond!.data).message_id;
                
                const chat = convertToChat(respond!.data)
                store.selectedChat!.id_of_user_chat = chat.id_of_user_chat,
                store.selectedChat!.chat_id = chat.chat_id,
                store.selectedChat!.type_id = chat.type_id,
                store.selectedChat!.is_muted = chat.is_muted,

                store.selectedChat?.messages.forEach(msg => {
                    if (msg.message_id === newMessage.message_id) {
                        msg.message_id = message_id;
                        msg.is_read = ReadTypes.Unread;
                    }
                });
                
                const selectedChatTitle = store.selectedChat?.type_id === ChatType.Group 
                                                ? (store.selectedChat as IGroupChat).chat_title 
                                                : (store.selectedChat as IPrivateChat)?.user.username;
                store.allChats.forEach(c => {
                    const chatTitle = c.type_id === ChatType.Group 
                                        ? (c as IGroupChat).chat_title 
                                        : (c as IPrivateChat)?.user.username;
                    
                    if (chatTitle === selectedChatTitle) {
                        c.chat_id = store.selectedChat!.chat_id;
                        c.id_of_user_chat = store.selectedChat!.id_of_user_chat;
                        c.type_id = store.selectedChat!.type_id;
                        c.is_muted = store.selectedChat!.is_muted;
                        c.last_message.message_id = message_id;
                        c.messages.forEach(msg => {
                            if (msg.message_id === newMessage.message_id) {   
                                msg.message_id = message_id;
                                msg.is_read = ReadTypes.Unread;
                            }
                        });
                        
                        moveElementToStart(store.allChats, store.selectedChat!);
                        store.loading = false;
                        return
                    }
                });

                store.virtualListMessagesInst.scrollTo({ position: 'bottom' });

                moveElementToStart(store.allChats, store.selectedChat!);
            }
            else{
                request = {
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

                const message_id = convertToIChatMessage(respond!.data).message_id;

                store.selectedChat?.messages.forEach(msg => {
                    if (msg.message_id === newMessage.message_id) {
                        msg.message_id = message_id;
                        msg.is_read = ReadTypes.Unread;
                    }
                });
                
                store.allChats.forEach(c => {
                    if (c.id_of_user_chat === store.selectedChat?.id_of_user_chat) {
                        c.last_message.message_id = message_id;
                        c.messages.forEach(msg => {
                            if (msg.message_id === newMessage.message_id) {   
                                msg.message_id = message_id;
                                msg.is_read = ReadTypes.Unread;
                            }
                        });
                        
                        store.virtualListMessagesInst.scrollTo({ position: 'bottom' });

                        moveElementToStart(store.allChats, store.selectedChat!);
                        store.loading = false;
                        return
                    }
                });
            }
        } 
        catch (error) {
            console.error(error);
        }
    }
}

</script>

<template>
    <NFlex class="flex flex-row p-10px b-t-#EFEFF5 b-t-solid b-t-1px w-full" :size="0">
        <NFlex>
            <NUpload
                @change="onChange"
            >
                <NButton :bordered="false" circle size="medium" ghost color="#898989">
                    <template #icon>
                        <NIcon :size="25"><PaperClipIcon/></NIcon>
                    </template>
                </NButton>
            </NUpload>
        </NFlex>
        <NFlex>
            <NButton @click="onShowEmojiPickerButtonClick" :bordered="false" circle size="medium" ghost color="#898989">
                <template #icon>
                    <NIcon :size="25"><FaceSmileIcon/></NIcon>
                </template>
            </NButton>
        </NFlex>
        <NFlex class="flex-1 m-l-10px m-r-10px">
            <NInput
                ref="inputRef"
                type="textarea"
                :autosize="{
                    minRows: 2,
                    maxRows: 2,
                }"
                v-model:value="store.selectedChat!.messageText"
                :bordered="false"
                placeholder="Type your message here.."
                class="bg-#FAFAFA rounded-10px"
                @on-change="onInputChange"
                @keydown="handleKeyDownEnter"
            >
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