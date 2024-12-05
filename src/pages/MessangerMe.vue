<script setup lang="ts">
import { NLayout, NLayoutSider, NFlex, useNotification, NLayoutHeader } from 'naive-ui';
import Menu from '../components/Menu.vue';  
import Chats from '../components/Chats.vue';
import ChatInterface from '../components/ChatInterface.vue';
import { useStore } from '../stores/store';
import Settings from '../components/Settings.vue';
import UserInfo from '../components/UserInfo.vue';
import SetAvatar from '../components/SetAvatar.vue';


const store = useStore();
store.messangerNotification = useNotification();

</script>
<template>
  <NFlex :size="0" class="w-full">
  <NLayout class="h-100vh"> 
    <ChatInterface />
  </NLayout>
  <UserInfo 
    v-if="store.showUserInfo"
    class="absolute top-0 left-0 w-full h-full z-50 bg-white"
  />
</NFlex>
<!-- <SetAvatar/> -->
</template>

<style scoped>
</style>



