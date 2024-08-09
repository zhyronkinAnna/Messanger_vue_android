<script setup lang="ts">
import { NGridItem, NGrid, NH2, NVirtualList, NAvatar, NText, NFlex, useNotification, NIcon, NMenu, NButton, NInput } from 'naive-ui';
import { InformationCircleOutline, CallOutline } from '@vicons/ionicons5'
</script>

<template>
  <NFlex class="flex flex-row p-10px b-t-#EFEFF5 b-t-solid b-t-1px w-full" :size="0" >
        <NFlex>
            <NButton :bordered="false" circle size="medium" class="m-b-10px" ghost color="#898989">
                <template #icon>
                    <NIcon ><CallOutline/></NIcon>
                </template>
            </NButton>
        </NFlex>
        <NFlex>
            <NButton :bordered="false" circle size="medium" class="m-b-10px" ghost color="#898989">
                <template #icon>
                    <NIcon ><CallOutline/></NIcon>
                </template>
            </NButton>
        </NFlex>
        <NFlex class="flex-1">
            <NInput :bordered="false" round placeholder="Type your message here.." class="bg-#FAFAFA h-35px">
                <template #suffix>
                    <NIcon/>
                </template>
            </NInput>
        </NFlex>
        
    </NFlex>
</template>

<style>
</style>