<script setup lang="ts">
import { NFlex, NVirtualList, VirtualListInst } from 'naive-ui';
import TextMessage from './TextMessage.vue';
import { onMounted, ref } from 'vue';

interface Props {
    items: {
        key: string;
        value: string;
        avatar: string;
}[];
}

const virtualListInst = ref<VirtualListInst>()

onMounted(() => {
    virtualListInst.value?.scrollTo({ index: props.items.length - 1 })
});

const props = defineProps<Props>();
</script>

<template>
    <NVirtualList :item-size="90" :items="props.items" ref="virtualListInst" class="bg-#FAFAFA">
        <template #default="{ item }">
            <NFlex class="h-70px p-10px">
                <TextMessage :id="item.key"></TextMessage>
            </NFlex>
        </template>
    </NVirtualList>
</template>

<style>
</style>