<script setup lang="ts">
import { NGridItem, NGrid, NAvatar, NText, NFlex, NDropdown, useNotification, NIcon } from 'naive-ui';
import ReadIcon from '../assets/read.svg';
import UnreadIcon from '../assets/unread.svg';
import { nextTick, ref } from 'vue';
import { ChatMessageTypes, ChatType, convertToIChatMessage, IChat, IGroupChat, IPrivateChat, IRequest, ReadTypes } from '../models';
import { useStore } from '../stores/store';
import { formatDateTime, handleError, handleRequest } from '../helper';
import { useWsService } from '../services/wsServiceManager';
import { NDivider } from 'naive-ui';
import { useRouter } from 'vue-router';
import { SpeakerXMarkIcon } from '@heroicons/vue/24/outline';
import Sending from '../assets/sending.svg';


// Initialize store and services
const store = useStore();
const wsService = useWsService();
const notification = useNotification();
const router = useRouter();

// Reactive references for dropdown menu
const activeDropdownId = ref<number | null>(null);
const showDropdownRef = ref(false);
const xRef = ref(0);
const yRef = ref(0);
let pressTimer: ReturnType<typeof setTimeout> | null = null;

// Обработчик долгого нажатия (контекстное меню)
function handleLongPress(e: TouchEvent, id: number) {
    pressTimer = setTimeout(() => {
        const touch = e.touches[0];
        activeDropdownId.value = id;
        showDropdownRef.value = true;
        xRef.value = touch.clientX;
        yRef.value = touch.clientY;
    }, 600); // Срабатывает через 600 мс
}

// Очищаем таймер при отмене нажатия
function cancelLongPress() {
    if (pressTimer) {
        clearTimeout(pressTimer);
        pressTimer = null;
    }
}

// Закрытие контекстного меню
function onClickoutside(event: Event) {
    const dropdown = document.querySelector(".dropdown-menu"); 
    if (!dropdown || !dropdown.contains(event.target as Node)) {
        showDropdownRef.value = false;
        activeDropdownId.value = null;
    }
}

// Обработчик выбора элемента в меню
function handleSelect(key: string | number) {
    if (key === "delete_chat") {
        try {
            const request: IRequest = {
                command: "DeleteChat",
                data: { id: props.chat.chat_id },
            };

            if (props.chat.chat_id === store.selectedChat?.chat_id) {
                store.selectedChat = null;
            }

            handleRequest(wsService!, request, false);
            store.allChats = store.allChats.filter(chat => chat.chat_id !== props.chat.chat_id);
        } catch (error) {
            console.error(error);
        }
    }
    showDropdownRef.value = false;
}

// Set online status for private chats
function setOnlineStatus() {
    if (store.selectedChat!.type_id === ChatType.Private) {
        console.log((store.selectedChat as IPrivateChat).user.logout_time, "logout_time");
        const privateChat = store.selectedChat as IPrivateChat;
        store.selectedChat!.onlineStatus = privateChat.user.logout_time == null
            ? "Online"
            : formatDateTime(privateChat.user.logout_time!);
    }
}

// Handle chat selection
async function onSelectChat() {
    try {
        store.showUserInfo = false;

        const request: IRequest = {
            command: "GetMessages",
            data: {
                id: props.chat?.id_of_user_chat,
                user_id: store.user?.id,
            }
        };

        if (store.selectedChat?.chat_id == null) {
            const index = store.allChats.indexOf(store.selectedChat!);
            if (index !== -1) {
                store.allChats.splice(index, 1);
            }
        }

        if (!props.chat.messages || props.chat.messages.length <= props.chat.unread_messages_count) {
            const respond = await handleRequest(wsService!, request);
            if (respond?.errorMessage) {
                handleError({ subject: "Error", body: respond?.errorMessage }, notification);
            }
            props.chat.messages = (respond?.data as unknown as any[])?.map(item => convertToIChatMessage(item));
        }

        store.selectedChat = props.chat;
        setOnlineStatus();

        if (store.selectedChat.unread_messages_count > 0) {
            store.selectedChat.unread_messages_count = 0;
            store.selectedChat.last_message.is_read = ReadTypes.DoNotShow;
            const resetRequest: IRequest = {
                command: "ResetCountOfUnreadMessages",
                data: {
                    user_id: store.user?.id,
                    id: store.selectedChat!.id_of_user_chat,
                    chat_id: store.selectedChat!.chat_id,
                }
            };
            handleRequest(wsService!, resetRequest, false);
        }

        if (!store.allChats.includes(store.selectedChat)) {
            store.allChats.unshift(store.selectedChat);
        }
    } catch (error) {
        console.error(error);
    }

    goToChat();
    store.inputSearchInstRef.clear();
}


function goToChat(){
    router.push({name:'Messanger'});
}

// Dropdown menu options
const options = [
    {
        label: 'Delete Chat',
        key: 'delete_chat'
    }
];

// Define component props
interface Props {
    chat: IChat;
}

const props = defineProps<Props>();

</script>

<template>
    <NFlex 
        vertical 
        class="bg-white rounded-2 overflow-hidden p-l-10px p-r-20px"
        :class="{ 'hover-bg': !showDropdownRef && props.chat.chat_id !== store.selectedChat?.chat_id, 'selected-bg': props.chat.chat_id === store.selectedChat?.chat_id 
        && store.selectedChat != null}"
        @touchstart="handleLongPress($event, chat.chat_id)" 
        @touchend="cancelLongPress"
        @click="onSelectChat"
    >
        <NDropdown
            placement="bottom-start"
            trigger="manual"
            :x="xRef"
            :y="yRef"
            :options="options"
            :show="showDropdownRef"
            :on-clickoutside="onClickoutside"
            @select="handleSelect"
        />
        <NGrid :cols="5" :x-gap="5" class="h-50px">
            <NGridItem class="justify-center flex items-center">
                <NAvatar 
                round
                :size="43"
                :src="props.chat.type_id === ChatType.Group ? (props.chat as IGroupChat).avatar_url! : 
                    props.chat.type_id === ChatType.Private ? (props.chat as IPrivateChat).user.avatar_url! : ''"
                />
            </NGridItem>
            <NGridItem :span="4">
                <NFlex>
                    <NGrid :cols="8">
                        <NGridItem :span="5">
                            <!-- <NText strong>
                                {{ 
                                    props.chat.type_id === ChatType.Group ? 
                                    (props.chat as IGroupChat).chat_title : 
                                    props.chat.type_id === ChatType.Private ? 
                                    (props.chat as IPrivateChat).user.username : 
                                    ''
                                }}
                            </NText> -->
                            <NFlex align="center" :size="5">
                                <NText strong>
                                    {{ 
                                        props.chat.type_id === ChatType.Group ? 
                                        (props.chat as IGroupChat).chat_title : 
                                        props.chat.type_id === ChatType.Private ? 
                                        (props.chat as IPrivateChat).user.username : 
                                        ''
                                    }}
                                </NText>
                                <NIcon v-if="props.chat.is_muted" :size="16">
                                    <SpeakerXMarkIcon/>
                                </NIcon>
                            </NFlex>
                        </NGridItem>
                        <NGridItem class="justify-right flex items-center" :span="3">
                            <NText>{{ props.chat.last_message.sent_at ? new Date(props.chat.last_message.sent_at)
                                    .toLocaleDateString('ru-RU', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric',
                                    }): '' }}
                            </NText>
                        </NGridItem>
                        <NGridItem :span="7" class="w-full overflow-hidden">
                            <NText style="display: block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 100%;">
                                {{ props.chat.last_message.type == ChatMessageTypes.Text ? 
                                     props.chat.last_message.text : props.chat.chat_id != null ? "File" : '' }}
                            </NText>
                        </NGridItem>
                        <NGridItem class="justify-right flex items-center">
                            <NText v-if="props.chat.unread_messages_count > 0" class="bg-#007AFF rounded-full text-white p-l-1 p-r-1 items-center justify-center flex ">
                                {{props.chat.unread_messages_count}}</NText>
                            <UnreadIcon v-else-if="props.chat.last_message.is_read === ReadTypes.Unread"/>
                            <ReadIcon v-else-if="props.chat.last_message.is_read === ReadTypes.Read"/>
                            <Sending v-else-if="props.chat.last_message.is_read === ReadTypes.Sending" class="p-r-5px"/>
                        </NGridItem>
                    </NGrid>
                </NFlex>
            </NGridItem>
        </NGrid>
           <n-divider horizontal style="border-color: #ccc; border-width: 2px; height: 2px; margin: 0.5px 0 0 20%;" />
    </NFlex>
</template>

<style scoped>
.hover-bg {
    transition: background-color 0.3s;
}

.hover-bg:hover {
    background-color: #F4F7FF;
}

.active-bg {
    background-color: #F4F7FF;
}
.selected-bg {
    background-color: #D9E0F2;
}
</style>
