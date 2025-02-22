<script setup lang="ts">
import { NButton, NDropdown, NFlex, NIcon, NSpin, NText, useNotification } from 'naive-ui';
import UnreadIcon from '../assets/unread.svg';
import ReadIcon from '../assets/read.svg';
import Sending from '../assets/sending.svg';
import { ChatMessageTypes, IChatMessage, IRequest, ReadTypes } from '../models';
import { useStore } from '../stores/store';
import { DocumentTextIcon, ArrowPathIcon  } from '@heroicons/vue/24/solid';
import { nextTick, ref } from 'vue';
import { downloadFile, handleError, handleRequest } from '../helper';
import { useWsService } from '../services/wsServiceManager';

const store = useStore();
const wsService = useWsService();
const notification = useNotification();

const xRef = ref(0);
const yRef = ref(0);
const showDropdownRef = ref(false);
const fileLoading = ref(false);
const activeDropdownId = ref<number | null>(null);
let pressTimer: ReturnType<typeof setTimeout> | null = null;

const options = [
    {
        label: 'Delete Message',
        key: 'delete_message'
    }
]

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

function handleSelect(key: string | number) {
    showDropdownRef.value = false;
    if (key === "delete_message") {
        try {
            let request: IRequest;
            const index = store.selectedChat?.messages.findIndex(message => message.message_id === props.messageFile.message_id);

            if (store.selectedChat && store.selectedChat.messages[index!].message_id === props.messageFile.message_id) {
                if(store.selectedChat.messages.length === 1) {
                    request = {
                        command: "DeleteChat",
                        data: {
                            id: store.selectedChat.chat_id,
                        }
                    };

                    store.selectedChat = null;

                    handleRequest(wsService!, request, false);

                    const index = store.allChats.findIndex(chat => chat.chat_id === store.selectedChat!.chat_id);
                    if (index !== -1) {
                        store.allChats.splice(index, 1);
                    }
                } else
                {
                    request = {
                        command: "DeleteMessage",
                        data: {
                            id: props.messageFile.message_id,
                            type: ChatMessageTypes.File
                        }
                    };

                    if(store.selectedChat.last_message.message_id === props.messageFile.message_id) {
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

function onClickoutside() {
    showDropdownRef.value = false;
    activeDropdownId.value = null;
}

interface Props {
    messageFile: IChatMessage
}

async function onButtonSaveClick() {
    fileLoading.value = true;
    const request = {
        command: "DownloadFileFromChat", 
        data: {
            id: props.messageFile.message_id,
        }
    };
    const respond = await handleRequest(wsService!, request);
    
    if (respond?.errorMessage) {
        handleError({ subject: "Error", body: respond?.errorMessage }, notification)
    }
    const fileLink = (respond?.data as { file_link?: string })?.file_link;
    await downloadFile(fileLink!, props.messageFile.file_title!);
    fileLoading.value = false;
}

const props = defineProps<Props>();
</script>

<template>
    <!-- <NFlex vertical :size="0" 
            class="bg-#F4F4F7 p-10px" 
            justify="center" 
            @touchstart="(e) => {if (store.user?.username === props.messageFile.username) 
                handleLongPress(e, props.messageFile.message_id!)}"
            @touchend="cancelLongPress">
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
        <NFlex align="center">
            <NFlex align="center" justify="center" class="w-50px h-50px rounded-8px bg-#DCE8F5">
                <NIcon v-if="!fileLoading" :size="40"  color="#007AFFFF"><DocumentTextIcon/></NIcon>
                <NSpin v-if="fileLoading">
                    <template #icon>
                        <n-icon>
                            <ArrowPathIcon />
                        </n-icon>
                    </template>
                </NSpin>
            </NFlex>
            <NFlex vertical :size="0">
                <NFlex>
                    <NText strong class="text-15px">
                        {{ props.messageFile.file_title }}
                    </NText>
                </NFlex>
                <NFlex>
                    <NText>
                        {{ props.messageFile.file_size }}
                    </NText>
                    <NButton v-if="props.messageFile.is_read !== ReadTypes.Sending" text tag="a" text-color="#007AFFFF" @click="onButtonSaveClick">
                        Save
                    </NButton>
                </NFlex>
            </NFlex>
        </NFlex>
        <NFlex :size="0" :class="{ 'm-l-auto': props.messageFile.username === store.user?.username }" align="center">
            <ReadIcon v-if="props.messageFile.is_read === ReadTypes.Read" class="p-r-5px"/>
            <UnreadIcon v-else-if="props.messageFile.is_read === ReadTypes.Unread" class="p-r-5px"/>
            <Sending v-else-if="props.messageFile.is_read === ReadTypes.Sending" class="p-r-5px"/>
            <NText class="opacity-45%">
                {{ 
                    new Date(props.messageFile.sent_at)
                    .toLocaleTimeString('ru-RU', {
                        hour: '2-digit',
                        minute: '2-digit',
                    }) 
                }}
            </NText>
        </NFlex>
    </NFlex> -->
    <NFlex vertical :size="0" 
    class="bg-#F4F4F7 p-10px" 
    justify="center" 
    @touchstart="(e) => {if (store.user?.username === props.messageFile.username) 
        handleLongPress(e, props.messageFile.message_id!)}"
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
        :on-clickoutside="onClickoutside"
        @select="handleSelect"
    />

    <!-- Иконка файла + Информация -->
    <NFlex align="center">
        <NFlex align="center" justify="center" class="w-50px h-50px rounded-8px bg-#DCE8F5 mb-2">
            <NIcon v-if="!fileLoading" :size="40" color="#007AFFFF"><DocumentTextIcon/></NIcon>
            <NSpin v-if="fileLoading">
                <template #icon>
                    <n-icon>
                        <ArrowPathIcon />
                    </n-icon>
                </template>
            </NSpin>
        </NFlex>

        <NFlex vertical :size="2" class="m-l-8px">
            <!-- Название файла -->
            <NText strong class="text-15px">
                {{ props.messageFile.file_title }}
            </NText>

            <!-- Размер файла + Save -->
            <NFlex justify="space-between" align="center">
                <NText>{{ props.messageFile.file_size }}</NText>
                <NButton v-if="props.messageFile.is_read !== ReadTypes.Sending" text tag="a" text-color="#007AFFFF" class="ml-2" @click="onButtonSaveClick">
                    Save
                </NButton>
            </NFlex>

            <!-- Статус + Время (на одном уровне) -->
            <NFlex :size="0" :class="{ 'm-l-auto': props.messageFile.username === store.user?.username }" align="center" justify="flex-end">
                <NFlex align="center">
                    <ReadIcon v-if="props.messageFile.is_read === ReadTypes.Read" class="p-r-5px"/>
                    <UnreadIcon v-else-if="props.messageFile.is_read === ReadTypes.Unread" class="p-r-5px"/>
                    <Sending v-else-if="props.messageFile.is_read === ReadTypes.Sending" class="p-r-5px"/>
                </NFlex>

                <NText class="opacity-45%">
                    {{ 
                        new Date(props.messageFile.sent_at)
                        .toLocaleTimeString('ru-RU', {
                            hour: '2-digit',
                            minute: '2-digit',
                        }) 
                    }}
                </NText>
            </NFlex>
        </NFlex>
    </NFlex>
</NFlex>

</template>
<style>
</style>