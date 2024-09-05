<script setup lang="ts">
import { NFlex, NVirtualList, VirtualListInst } from 'naive-ui';
import TextMessage from './TextMessage.vue';
import { onMounted, ref } from 'vue';
import { useStore } from '../stores/store';
import { ChatMessageTypes } from '../models/ChatMessageTypesEnum';
import FileMessage from './FileMessage.vue';

const store = useStore();

const virtualListInst = ref<VirtualListInst>()

onMounted(() => {
    virtualListInst.value?.scrollTo({ index: store.selectedChat!.messages.length - 1 });
});
</script>

<template>
    <NVirtualList :item-size="80" :items="store.selectedChat?.messages" ref="virtualListInst" class="bg-#FAFAFA" item-resizable>
        <template #default="{ item }">
            <NFlex class="p-b-5px p-t-5px p-l-10px p-r-10px">
                <TextMessage
                    v-if="item.type === ChatMessageTypes.Text" 
                    :message="item"
                    :class="item.username !== store.user?.username
                        ? 'm-r-auto rounded-br-20px rounded-tr-20px rounded-bl-20px' 
                        : 'm-l-auto rounded-br-20px rounded-tl-20px rounded-bl-20px'"
                />
                <FileMessage
                    v-else-if="item.type === ChatMessageTypes.File" 
                    :messageFile="item"
                    :class="item.username !== store.user?.username
                        ? 'm-r-auto rounded-br-20px rounded-tr-20px rounded-bl-20px' 
                        : 'm-l-auto rounded-br-20px rounded-tl-20px rounded-bl-20px'"
                />
            </NFlex>
        </template>
    </NVirtualList>
</template>

<style>
</style>