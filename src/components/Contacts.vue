<script setup lang="ts">
import { NIcon, NCard, NText, NInput, NVirtualList, NFlex, NGrid, NGridItem, NH1, NH2 } from 'naive-ui';
import { SearchOutline } from '@vicons/ionicons5'
import Contact from './Contact.vue';

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
    <NGrid cols="1" class="flex flex-col h-100vh" xGap="12">
        <NGridItem class="p-l-15px p-r-15px m-b-5px">
            <NH2>Chats</NH2>
        </NGridItem>
        <NGridItem class="p-l-15px p-r-15px m-b-15px">
            <NInput round placeholder="Search chat">
                <template #suffix>
                    <NIcon :component="SearchOutline" />
                </template>
            </NInput>
        </NGridItem>
        <NGridItem class="overflow-hidden flex-grow-1">
            <NVirtualList :item-size="50" :items="items">
                <template #default="{ item }">
                    <Contact :id="item.key"/>
                </template>
            </NVirtualList>
        </NGridItem>
    </NGrid>
</template>

<style>
</style>