<script setup lang="ts">
import { NDropdown, NFlex, NText } from 'naive-ui';
import UnreadIcon from '../assets/unread.svg';
import ReadIcon from '../assets/read.svg';
import Sending from '../assets/sending.svg';
import { ChatMessageTypes, IChatMessage, IRequest, ReadTypes } from '../models';
import { useStore } from '../stores/store';
import { useRouter } from 'vue-router';
import { nextTick, ref } from 'vue';
import { handleRequest } from '../helper';
import { useWsService } from '../services/wsServiceManager';

const store = useStore();
const wsService = useWsService();
const router = useRouter();

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
        xRef.value = touch.clientX;
        yRef.value = touch.clientY;
        
        nextTick().then(() => {
            showDropdownRef.value = true; // Открываем меню после обновления координат
        });
    }, 600); // Долгое нажатие — 600 мс
}

// Очищаем таймер при отмене нажатия
function cancelLongPress() {
    if (pressTimer) {
        clearTimeout(pressTimer);
        pressTimer = null;
    }
}

// Закрытие меню
function onClickoutside() {
    showDropdownRef.value = false;
    activeDropdownId.value = null;
}

// Обработчик выбора в меню
function handleSelect(key: string | number) {
    showDropdownRef.value = false;
    if (key === "delete_message") {
        try {
            let request: IRequest;
            const index = store.selectedChat?.messages.findIndex(message => message.message_id === props.message.message_id);
            if (store.selectedChat && store.selectedChat.messages[index!].message_id === props.message.message_id) {
                if(store.selectedChat.messages.length === 1) {
                    request = {
                        command: "DeleteChat",
                        data: { id: store.selectedChat.chat_id }
                    };
                    const index = store.allChats.findIndex(chat => chat.chat_id === store.selectedChat!.chat_id);
                    if (index !== -1) {
                        store.allChats.splice(index, 1);
                    }
                    store.selectedChat = null;
                    handleRequest(wsService!, request, false);
                    router.push({name:'Chats'});
                } else {
                    request = {
                        command: "DeleteMessage",
                        data: {
                            id: props.message.message_id,
                            type_id: ChatMessageTypes.Text,
                            user_chat_id: store.selectedChat.id_of_user_chat,
                            chat_id: store.selectedChat.chat_id,
                        }
                    };
                    if(store.selectedChat.last_message.message_id === props.message.message_id) {
                        store.selectedChat.last_message = store.selectedChat.messages[store.selectedChat.messages.length - 2];
                        const targetChat = store.allChats.find(chat => chat.chat_id === store.selectedChat?.chat_id);
                        if (targetChat) {
                            targetChat.last_message = store.selectedChat?.last_message;
                        }
                        store.allChats.sort((a, b) => new Date(b.last_message.sent_at).getTime() - new Date(a.last_message.sent_at).getTime());
                    }
                    if (index !== undefined && index !== -1) {
                        store.selectedChat?.messages.splice(index, 1);
                    }
                    handleRequest(wsService!, request, false);
                }
            }
        } catch (error) {
            console.error(error);
        }
    }
}

// Dropdown menu options
const options = [{ label: 'Delete Message', key: 'delete_message' }];

// Define component props
interface Props {
    message: IChatMessage;
}

const props = defineProps<Props>();
</script>

<template>
    <NFlex 
        vertical 
        :size="0" 
        class="bg-#F4F4F7 p-10px" 
        justify="center" 
        @touchstart="(e) => { if (store.user?.username === props.message.username) handleLongPress(e, props.message.message_id!) }"
        @touchend="cancelLongPress"
    >
        <!-- Контекстное меню -->
        <NDropdown
            placement="bottom-start"
            trigger="manual"
            :x="xRef"
            :y="yRef"
            :options="options"
            :show="showDropdownRef"
            @clickoutside="onClickoutside"
            @select="handleSelect"
        />
        
        <NFlex class="text-17px">
            <NText>
                {{ props.message.text }}
            </NText>
        </NFlex>

        <NFlex :size="0" :class="{ 'm-l-auto': props.message.username === store.user?.username }" align="center">
            <ReadIcon v-if="props.message.is_read === ReadTypes.Read" class="p-r-5px"/>
            <UnreadIcon v-else-if="props.message.is_read === ReadTypes.Unread" class="p-r-5px"/>
            <Sending v-else-if="props.message.is_read === ReadTypes.Sending" class="p-r-5px"/>
            <NText class="opacity-45%">
                {{ 
                    new Date(props.message.sent_at)
                    .toLocaleTimeString('ru-RU', {
                        hour: '2-digit',
                        minute: '2-digit',
                    }) 
                }}
            </NText>
        </NFlex>
    </NFlex>
</template>
