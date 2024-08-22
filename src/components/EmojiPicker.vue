<script setup lang="ts">
import { NFlex } from 'naive-ui';
import EmojiPicker, { EmojiExt } from 'vue3-emoji-picker'
import 'vue3-emoji-picker/css'
import { useStore } from '../stores/store';
import { onBeforeUnmount, onMounted, ref } from 'vue';

const store = useStore();
const emojiPickerRef = ref<InstanceType<typeof EmojiPicker> | null>(null);
let ignoreClick = true;


function onSelectEmoji(emoji: EmojiExt) {
    console.log(emoji);
}

function handleClickOutside(event: MouseEvent) {
    if (ignoreClick === false && emojiPickerRef.value && !emojiPickerRef.value.$el.contains(event.target as Node)) {
        console.log("wefwefwef");
        store.showEmojiPicker = false;
    }
    ignoreClick = false;
}

onMounted(() => {
    document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside);
});

</script>

<template>
    <NFlex>
        <EmojiPicker ref="emojiPickerRef" @select="onSelectEmoji" class="h-300px" :disableSkinTones="true"/>
    </NFlex>
</template>

<style>
.v3-emoji-picker .v3-footer{
    display: none;
}
</style>