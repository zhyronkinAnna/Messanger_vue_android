<script setup lang="ts">
import { NIcon, NInput, NVirtualList, NH2, NFlex } from 'naive-ui';
import Chat from './Chat.vue';
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline';
import { IChat } from '../models';

interface Props {
    chats: IChat[];
}
const props = defineProps<Props>();
console.log("apappapa", props.chats);

</script>

<template>
    <NFlex class="flex flex-col h-100vh" :size="0" vertical>
        <NFlex class="p-l-15px p-r-15px m-b-5px m-t-8px">
            <NH2>Chats</NH2>
        </NFlex>
        <NFlex class="p-l-15px p-r-15px m-b-15px">
            <NInput round placeholder="Search chat">
                <template #suffix>
                    <NIcon><MagnifyingGlassIcon/></NIcon>
                </template>
            </NInput>
        </NFlex>
        <NFlex class="flex-1 overflow-y-auto">
            <NVirtualList :item-size="50" :items="props.chats">
                <template #default="{ item }">
                    <Chat :chat="item"/>
                </template>
            </NVirtualList>
        </NFlex>
    </NFlex>
</template>

<style>
</style>