<script setup lang="ts">
import { NFlex, NText } from 'naive-ui';
import UnreadIcon from '../assets/unread.svg';

interface Props {
    id: string 
}

const props = defineProps<Props>();

</script>

<template>
    <NFlex vertical :size="0" class="bg-#F4F4F7 p-10px" justify="center">
        <NFlex class="text-17px">
            <NText>
                testwefwefwefwefwefwef{{ props.id }}
            </NText>
        </NFlex>
        <NFlex :size="0" :class="{ 'm-l-auto': Number(props.id) % 2 === 1 }" align="center">
            <UnreadIcon v-if="Number(props.id) % 2 === 1" class="p-r-5px"/>
            <NText class="opacity-45%">
                22:22
            </NText>
        </NFlex>
    </NFlex>
</template>
<style>
</style>