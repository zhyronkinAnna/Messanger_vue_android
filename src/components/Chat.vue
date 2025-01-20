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



const store = useStore();
const showDropdownRef = ref(false)
const xRef = ref(0)
const yRef = ref(0)
const wsService = useWsService();
const notification = useNotification();
const router = useRouter();


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
    switch(key) {
    case "delete_chat":
        try {
            const request: IRequest  = {
                command: "DeleteChat", 
                data: {
                    id: props.chat.chat_id,
                }
            };

            if(props.chat.chat_id === store.selectedChat?.chat_id)
            {
                store.selectedChat = null;
            }

            handleRequest(wsService!, request, false);

            const index = store.allChats.findIndex(chat => chat.chat_id === props.chat.chat_id);

            if (index !== -1) {
                store.allChats.splice(index, 1);
            }
        } 
        catch (error) {
            console.error(error);
        }
        break;
    }
}

function setOnlineStatus() {
    if (store.selectedChat!.type_id === ChatType.Private) {
        console.log((store.selectedChat as IPrivateChat).user.logout_time, "logout_time");
        if ((store.selectedChat as IPrivateChat).user.logout_time == null) {
            store.selectedChat!.onlineStatus = "Online";
        } else {
            store.selectedChat!.onlineStatus = formatDateTime((store.selectedChat as IPrivateChat).user.logout_time!);
        }
    }
}

async function onSelectChat()
{
    try {
        store.showUserInfo = false;

        const request: IRequest  = {
            command: "GetMessages", 
            data: {
                id: props.chat?.id_of_user_chat,
                user_id: store.user?.id,
            }
        };

        if (store.selectedChat?.chat_id == null)
        {
            let index = store.allChats.indexOf(store.selectedChat!);
            
            if (index !== -1) {
                store.allChats.splice(index, 1);
            }
        }
     
        if (props.chat.messages?.length <= 0 || props.chat.messages == null || props.chat.messages?.length <= props.chat.unread_messages_count){
            const respond = await handleRequest(wsService!, request);

            if (respond?.errorMessage) {
                handleError({ subject: "Error", body: respond?.errorMessage }, notification)
            }

            props.chat.messages = (respond?.data as unknown as any[])?.map(item => 
                convertToIChatMessage(item)
            );
        }
        store.selectedChat = props.chat;
        setOnlineStatus();

        if (store.selectedChat.unread_messages_count > 0){
            store.selectedChat.unread_messages_count = 0;
            store.selectedChat.last_message.is_read = ReadTypes.DoNotShow;
            const request: IRequest  = {
                command: "ResetCountOfUnreadMessages", 
                data: {
                    user_id: store.user?.id,
                    id: store.selectedChat!.id_of_user_chat,
                    chat_id: store.selectedChat!.chat_id,
                }
            };
            
            handleRequest(wsService!, request, false);
        }

        const temp = store.allChats.filter(chat =>
            chat === store.selectedChat            
        );

        if (temp.length === 0)
        {
            store.allChats.unshift(store.selectedChat);
        }
    } 
    catch (error) {
        console.error(error);
    }

    goToChat();
    store.inputSearchInstRef.clear();
}

function goToChat(){
    router.push({name:'Messanger'});
}


const options = [
    {
        label: 'Delete Chat',
        key: 'delete_chat'
    }
];

interface Props {
    chat: IChat;
}

const props = defineProps<Props>();

</script>

<template>
    <NFlex 
        vertical 
        class="bg-white rounded-2 overflow-hidden p-l-10px p-r-20px"
        :class="{ 'hover-bg': !showDropdownRef && props.chat !== store.selectedChat, 'selected-bg': props.chat === store.selectedChat}" 
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
