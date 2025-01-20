<script setup lang="ts">
import { NLayout, NLayoutSider, NFlex, useNotification, NLayoutHeader } from 'naive-ui';
import Menu from '../components/Menu.vue';  
import Chats from '../components/Chats.vue';
import ChatInterface from '../components/ChatInterface.vue';
import { useStore } from '../stores/store';
import Settings from '../components/Settings.vue';
import UserInfo from '../components/UserInfo.vue';
import SetAvatar from '../components/SetAvatar.vue';
import CallPanel from '../components/CallPanel.vue';

const store = useStore();
store.messangerNotification = useNotification();

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
          <Chats/>
        </NLayoutSider>
        <NFlex class="flex flex-col flex-grow-1">
          <ChatInterface></ChatInterface>
        </NFlex>
      </NLayout>
    </NLayout>
    <UserInfo v-if="store.showUserInfo"/>
  </NFlex>
  <Settings/>
  <SetAvatar/>
</template>

<style scoped>
.chat-title {
  font-weight: bold;  /* Жирный текст */
  font-size: 1rem;    /* Большой размер шрифта */ 
}
</style>



