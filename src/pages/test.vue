<script setup lang="ts">
import { NGridItem, NGrid, NH2, NVirtualList, NAvatar, NText, NFlex, useNotification, NIcon, NMenu, NButton } from 'naive-ui';
import { LogOutOutline, SettingsOutline } from '@vicons/ionicons5'
</script>

<template>
  <NFlex vertical class="h-100vh b-r-solid b-r-1px w-40px justify-center flex items-center">
    <n-avatar
      class="m-t-10px"
      round
      size="medium"
      src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
    />
    <NButton :bordered="false" circle size="medium" class="m-t-auto" ghost color="#007AFFFF">
      <template #icon>
        <NIcon :size="30"><SettingsOutline/></NIcon>
      </template>
    </NButton>
    <NButton :bordered="false" circle size="medium" class="m-b-10px" ghost color="#007AFFFF">
      <template #icon>
        <NIcon :size="30"><LogOutOutline/></NIcon>
      </template>
    </NButton>
  </NFlex>
</template>

<style>
</style>