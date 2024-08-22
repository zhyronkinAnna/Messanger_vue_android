<script setup lang="ts">
import { NFlex } from 'naive-ui';
import ChatHeader from './ChatHeader.vue';
import MessageHistory from './MessageHistory.vue';
import MessageInput from './MessageInput.vue';
import EmojiPicker from './EmojiPicker.vue';
import { useStore } from '../stores/store';

const store = useStore();

interface Props {
    items: {
    key: string;
    value: string;
    avatar: string;
}[];
}

const props = defineProps<Props>();
</script>

<template>
    <NFlex class="flex flex-col h-100vh" :size="0" vertical>
        <NFlex>
            <ChatHeader/>
        </NFlex>
        <NFlex class="flex-1 overflow-y-auto">
            <MessageHistory :items="props.items"/>
            <EmojiPicker v-if="store.showEmojiPicker" class="absolute bottom-15 m-l-5px"/>
        </NFlex>
        <NFlex>
            <MessageInput/>
        </NFlex>
    </NFlex>
</template>

<style>
</style>