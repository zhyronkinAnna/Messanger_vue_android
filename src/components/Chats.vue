<script setup lang="ts">
import { NIcon, NInput, NVirtualList, NH2, NFlex } from 'naive-ui';
import { SearchOutline } from '@vicons/ionicons5'
import Chat from './Chat.vue';

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
        <NFlex class="p-l-15px p-r-15px m-b-5px">
            <NH2>Chats</NH2>
        </NFlex>
        <NFlex class="p-l-15px p-r-15px m-b-15px">
            <NInput round placeholder="Search chat">
                <template #suffix>
                    <NIcon :component="SearchOutline" />
                </template>
            </NInput>
        </NFlex>
        <NFlex class="flex-1 overflow-y-auto">
            <NVirtualList :item-size="50" :items="props.items">
                <template #default="{ item }">
                    <Chat :id="item.key"/>
                </template>
            </NVirtualList>
        </NFlex>
    </NFlex>
</template>

<style>
</style>