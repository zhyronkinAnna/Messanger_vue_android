<script setup lang="ts">
import { NGridItem, NGrid, NAvatar, NText, NFlex, NDropdown, useNotification } from 'naive-ui';
import ReadIcon from '../assets/read.svg';
import UnreadIcon from '../assets/unread.svg';
import { nextTick, ref } from 'vue';
import { ChatType, convertToIChatMessage, IChat, IGroupChat, IPrivateChat, IRequest, ReadTypes } from '../models';
import { useStore } from '../stores/store';
import { handleError, handleRequest } from '../helper';
import { useWsService } from '../services/wsServiceManager';

const store = useStore();
const showDropdownRef = ref(false)
const xRef = ref(0)
const yRef = ref(0)
const wsService = useWsService();
const notification = useNotification();

const activeDropdownId = ref<number | null>(null);

function handleContextMenu(e: MouseEvent, id: number) {
    e.preventDefault();
    activeDropdownId.value = id;
    showDropdownRef.value = false;
    nextTick().then(() => {
        showDropdownRef.value = true;
        xRef.value = e.clientX;
        yRef.value = e.clientY;
    });
}

function onClickoutside() {
    showDropdownRef.value = false;
    activeDropdownId.value = null;
}

function handleSelect(key: string | number) {
    showDropdownRef.value = false
}

async function onSelectChat()
{
 
    try {
        const request: IRequest  = {
            command: "GetMessages", 
            data: {
                id: props.chat?.id_of_user_chat,
            }
        };

        const respond = await handleRequest(wsService!, request);

        if (respond?.errorMessage) {
            handleError({ subject: "Sign in Error", body: respond?.errorMessage }, notification)
        }

        console.debug("respond", respond);
        
        props.chat.messages = (respond?.data as unknown as any[])?.map(item => 
          convertToIChatMessage(item)
        );

        store.selectedChat = props.chat;
        console.log("alalalalallalalalall", store.selectedChat.messages);
    } 
    catch (error) {
        console.error(error);
    }
    finally {
    }
}

const options = [
    {
        label: 'Delete Chat',
        key: 'delete_chat'
    }
]

interface Props {
    chat: IChat;
}

const props = defineProps<Props>();

</script>

<template>
    <NFlex 
        vertical 
        class="m-l-5px w-250px h-50px bg-white rounded-2 overflow-hidden p-l-10px p-r-10px"
        :class="{ 'hover-bg': !showDropdownRef, 'active-bg': activeDropdownId === props.chat.chat_id }" 
        @contextmenu="(e) => handleContextMenu(e, props.chat.chat_id)"
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
                src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
                />
            </NGridItem>
            <NGridItem :span="4">
                <NFlex>
                    <NGrid :cols="8">
                        <NGridItem :span="5">
                            <NText strong>
                                {{ 
                                    props.chat.type_id === ChatType.Group ? 
                                    (props.chat as IGroupChat).chat_title : 
                                    props.chat.type_id === ChatType.Private ? 
                                    (props.chat as IPrivateChat).user.username : 
                                    ''
                                }}
                            </NText>
                        </NGridItem>
                        <NGridItem class="justify-right flex items-center" :span="3">
                            <NText>{{ new Date(props.chat.last_message.sent_at)
                                    .toLocaleDateString('ru-RU', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric',
                                    }) }}
                            </NText>
                        </NGridItem>
                        <NGridItem :span="7">
                            <NText>{{ props.chat.last_message.text }}</NText>
                        </NGridItem>
                        <NGridItem class="justify-right flex items-center">
                            <NText v-if="props.chat.unread_messages_count > 0" class="bg-#007AFF rounded-full text-white p-l-1 p-r-1 items-center justify-center flex ">{{props.chat.unread_messages_count}}</NText>
                            <UnreadIcon v-else-if="props.chat.last_message.is_read === ReadTypes.Unread"/>
                            <ReadIcon v-else-if="props.chat.last_message.is_read === ReadTypes.Read"/>
                        </NGridItem>
                    </NGrid>
                </NFlex>
            </NGridItem>
        </NGrid>
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
</style>
