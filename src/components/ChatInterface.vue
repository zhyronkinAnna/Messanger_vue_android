<script setup lang="ts">
import { NFlex } from 'naive-ui';
import ChatHeader from './ChatHeader.vue';
import MessageHistory from './MessageHistory.vue';
import MessageInput from './MessageInput.vue';

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
        </NFlex>
        <NFlex>
            <MessageInput/>
        </NFlex>
    </NFlex>
</template>

<style>
</style>