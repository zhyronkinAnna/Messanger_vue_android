<script setup lang="ts">
import { NLayout, NLayoutSider, NFlex } from 'naive-ui';
import Menu from '../components/Menu.vue';  
import Chats from '../components/Chats.vue';
import ChatInterface from '../components/ChatInterface.vue';
import { useStore } from '../stores/store';
import Settings from '../components/Settings.vue';
import UserInfo from '../components/UserInfo.vue';

const store = useStore();

const avatars = [
      'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg',
      'https://avatars.githubusercontent.com/u/20943608?s=60&v=4',
      'https://avatars.githubusercontent.com/u/46394163?s=60&v=4',
      'https://avatars.githubusercontent.com/u/39197136?s=60&v=4',
      'https://avatars.githubusercontent.com/u/19239641?s=60&v=4'
    ]

    const items = Array.from({ length: 1000 }, (_, i) => ({
      key: `${i}`,
      value: "",
      avatar: avatars[i % avatars.length]
    }))

</script>

<template>
  <NFlex :size="0">
    <Menu/>
    <NLayout class="h-100vh">
      <NLayout position="absolute" has-sider>
        <NLayoutSider
          bordered
          collapse-mode="width"
          :collapsed-width="50"
          :width="280"
        >
          <Chats :items="items"/>
        </NLayoutSider>
        <NFlex class="flex flex-col flex-grow-1">
          <ChatInterface :items="items" class="flex-grow-1"></ChatInterface>
        </NFlex>
      </NLayout>
    </NLayout>
    <UserInfo v-if="store.showUserInfo"/>
  </NFlex>
  <Settings/>
</template>

<style scoped>
</style>
