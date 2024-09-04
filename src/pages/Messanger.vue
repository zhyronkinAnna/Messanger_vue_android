<script setup lang="ts">
import { NLayout, NLayoutSider, NFlex, useNotification } from 'naive-ui';
import Menu from '../components/Menu.vue';  
import Chats from '../components/Chats.vue';
import ChatInterface from '../components/ChatInterface.vue';
import { useStore } from '../stores/store';
import Settings from '../components/Settings.vue';
import UserInfo from '../components/UserInfo.vue';
import SetAvatar from '../components/SetAvatar.vue';
import { onBeforeMount, ref } from 'vue';
import { IChat, IRequest } from '../models';
import { handleError, handleRequest } from '../helper';
import { useWsService } from '../services/wsServiceManager';
import { convertToChat } from '../models/ChatConverter';

const store = useStore();
const wsService = useWsService();
const notification = useNotification();
const chats = ref<IChat[]>([]);

onBeforeMount(async ()=>{
  try {
        const request: IRequest  = {
            command: "GetMyChats", 
            data: store.user
        };

        store.loading = true;
        const respond = await handleRequest(wsService!, request);

        if (respond?.errorMessage) {
            handleError({ subject: "Sign in Error", body: respond?.errorMessage }, notification)
        }

        console.debug("respond", respond);
        chats.value = (respond?.data as unknown as any[])?.map(item => 
          convertToChat(item)
        );
        console.debug("respond", chats.value);
    } 
    catch (error) {
        console.error(error);
    }
    finally {
        store.loading = false;
    }
})

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
          <Chats :chats="chats"/>
        </NLayoutSider>
        <NFlex class="flex flex-col flex-grow-1">
          <ChatInterface class="flex-grow-1"></ChatInterface>
        </NFlex>
      </NLayout>
    </NLayout>
    <UserInfo v-if="store.showUserInfo"/>
  </NFlex>
  <Settings/>
  <SetAvatar/>
</template>

<style scoped>
</style>
