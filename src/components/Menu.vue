<script setup lang="ts">
import { NAvatar, NFlex, NIcon, NButton } from 'naive-ui';
import { LogOutOutline, SettingsOutline } from '@vicons/ionicons5'
</script>

<template>
    <NFlex vertical class="h-100vh w-60px justify-center flex items-center bg-#FAFAFA">
        <NAvatar
            class="m-t-10px"
            round
            size="medium"
            src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
        />
        <NButton :bordered="false" circle size="medium" class="m-t-auto" ghost color="#898989">
            <template #icon>
                <NIcon :size="25"><SettingsOutline/></NIcon>
            </template>
        </NButton>
        <NButton :bordered="false" circle size="medium" class="m-b-10px" ghost color="#898989">
            <template #icon>
                <NIcon :size="25"><LogOutOutline/></NIcon>
            </template>
        </NButton>
    </NFlex>
</template>

<style>
</style>