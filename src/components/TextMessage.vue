<script setup lang="ts">
import { NFlex, NText } from 'naive-ui';
import UnreadIcon from '../assets/unread.svg';
import ReadIcon from '../assets/read.svg';
import { IChatMessage, ReadTypes } from '../models';
import { useStore } from '../stores/store';

const store = useStore();

interface Props {
    message: IChatMessage
}

const props = defineProps<Props>();
console.log(props.message.is_read);
</script>

<template>
    <NFlex vertical :size="0" class="bg-#F4F4F7 p-10px" justify="center">
        <NFlex class="text-17px">
            <NText>
                {{ props.message.text }}
            </NText>
        </NFlex>
        <NFlex :size="0" :class="{ 'm-l-auto': props.message.username === store.user?.username }" align="center">
            <ReadIcon v-if="props.message.is_read === ReadTypes.Read" class="p-r-5px"/>
            <UnreadIcon v-else-if="props.message.is_read === ReadTypes.Unread" class="p-r-5px"/>
            <NText class="opacity-45%">
                {{ 
                    new Date(props.message.sent_at)
                    .toLocaleTimeString('ru-RU', {
                        hour: '2-digit',
                        minute: '2-digit',
                    }) 
                }}
            </NText>
        </NFlex>
    </NFlex>
</template>
<style>
</style>