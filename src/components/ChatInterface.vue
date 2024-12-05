<script setup lang="ts">
import { ref } from 'vue';
import { NFlex } from 'naive-ui';
import ChatHeader from './ChatHeader.vue';
import MessageHistory from './MessageHistory.vue';
import MessageInput from './MessageInput.vue';
import EmojiPicker from './EmojiPicker.vue';
import { useStore } from '../stores/store';
import NotSelectedChat from './NotSelectedChat.vue';


const isModalVisible = ref(false);

const store = useStore();

</script>

<template>
    <NotSelectedChat v-if="!store.selectedChat"/>
    <NFlex v-if="store.selectedChat" class="flex flex-col h-100vh w-full" :size="0" vertical>
        <NFlex>
            <ChatHeader/>
        </NFlex>
        <NFlex class="flex-1 overflow-y-auto">
            <MessageHistory/>
            <EmojiPicker v-if="store.showEmojiPicker" class="absolute bottom-15 m-l-5px"/>
        </NFlex>
        <NFlex>
            <MessageInput/>
        </NFlex>
    </NFlex>
</template>

<style>
</style>