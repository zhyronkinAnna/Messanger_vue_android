<script setup lang="ts">
import { NLayout, NLayoutSider, NH2, NVirtualList, NAvatar, NText, NFlex, useNotification, FormInst, NGrid, NCard, NInput, NIcon, NGridItem } from 'naive-ui';
import Menu from '../components/Menu.vue';  
import Contacts from '../components/Contacts.vue';

const avatars = [
      'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg',
      'https://avatars.githubusercontent.com/u/20943608?s=60&v=4',
      'https://avatars.githubusercontent.com/u/46394163?s=60&v=4',
      'https://avatars.githubusercontent.com/u/39197136?s=60&v=4',
      'https://avatars.githubusercontent.com/u/19239641?s=60&v=4'
    ]

    const items = Array.from({ length: 100 }, (_, i) => ({
      key: `${i}`,
      value: "",
      avatar: avatars[i % avatars.length]
    }))

</script>

<template>
  <NFlex :size="0">
    <Menu></Menu>
    <NLayout class="h-100vh">
      <NLayout position="absolute" has-sider>
        <NLayoutSider
          bordered
          collapse-mode="width"
          :collapsed-width="50"
          :width="280"
        >
          <Contacts :items="items"/>
      </NLayoutSider>
        <NVirtualList :item-size="50" :items="items">
            <template #default="{ item }">
                wefwef
            </template>
        </NVirtualList>
      </NLayout>
    </NLayout>
  </NFlex>
</template>

<style scoped>
</style>
