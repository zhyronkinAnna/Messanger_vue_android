<script setup lang="ts">
import { NFlex } from 'naive-ui';
import EmojiPicker, { EmojiExt } from 'vue3-emoji-picker'
import 'vue3-emoji-picker/css'

function onSelectEmoji(emoji: EmojiExt) {
    console.log(emoji);
}
</script>

<template>
    <NFlex>
        <EmojiPicker @select="onSelectEmoji" class="h-300px" :disableSkinTones="true"/>
    </NFlex>
</template>

<style>
.v3-emoji-picker .v3-footer{
    display: none;
}
</style>