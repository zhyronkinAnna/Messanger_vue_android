<script setup lang="ts">
import { NButton, NFlex, NIcon, NInput } from 'naive-ui';
import { PaperClipIcon, FaceSmileIcon, PaperAirplaneIcon } from '@heroicons/vue/24/outline';
</script>

<template>
    <NFlex class="flex flex-row p-10px b-t-#EFEFF5 b-t-solid b-t-1px w-full" :size="0" >
        <NFlex>
            <NButton :bordered="false" circle size="medium" ghost color="#898989">
                <template #icon>
                    <NIcon :size="25"><PaperClipIcon/></NIcon>
                </template>
            </NButton>
        </NFlex>
        <NFlex>
            <NButton :bordered="false" circle size="medium" ghost color="#898989">
                <template #icon>
                    <NIcon :size="25"><FaceSmileIcon/></NIcon>
                </template>
            </NButton>
        </NFlex>
        <NFlex class="flex-1 m-l-10px m-r-10px">
            <NInput :bordered="false" placeholder="Type your message here.." class="bg-#FAFAFA rounded-10px">
                <template #suffix>
                    <NIcon/>
                </template>
            </NInput>
        </NFlex>
        <NFlex>
            <NButton :bordered="false" circle size="medium" ghost color="#007AFF">
                <template #icon>
                    <NIcon :size="25"><PaperAirplaneIcon/></NIcon>
                </template>
            </NButton>
        </NFlex>
    </NFlex>
</template>

<style>
</style>