<script setup lang="ts">
import { NAvatar, NButton, NFlex, NGrid, NGridItem, NH3, NIcon, NText } from 'naive-ui';
import { useStore } from '../stores/store';
import { PhoneXMarkIcon } from '@heroicons/vue/24/outline';
import { CallSignalTypeEnum, IPrivateChat, IRequest, NotificationTypes } from '../models';
import { onMounted } from 'vue';
import { useWsService } from '../services/wsServiceManager';
import { handleOutcomingCall, endCallAndSendRequestToReceiver} from '../helper';

// Initialize store and WebSocket service
const store = useStore();
const wsService = useWsService();

// Function to handle end call button click
function onButtonEndCallClick()
{
    store.callPanel = false; // Hide call panel
    store.outgoingCall = false; // Set outgoing call status to false
    endCallAndSendRequestToReceiver(store, wsService); // End call and notify receiver
}

// Lifecycle hook to handle outgoing call when component is mounted
onMounted(async () => {
    await handleOutcomingCall(store, wsService);
});
</script>
<template>
    <NFlex class="w-full items-center">
        <NFlex class="w-full" justify="center">
            <NAvatar
                round
                :size="150"
                :src="(store.selectedChat as IPrivateChat)?.user.avatar_url"
            />
        </NFlex>
        <NFlex class="w-full" justify="center">
            <NH3 strong>{{ (store.selectedChat as IPrivateChat)?.user.username }}</NH3>
        </NFlex>
        <NGrid :cols="1" :y-gap="100">
            <NGridItem>
                <NFlex justify="center">
                    <NText strong>Calling...</NText>
                </NFlex>                        
            </NGridItem>
            <NGridItem>
                <NFlex justify="center">
                    <NFlex vertical align="center">
                        <NButton strong secondary circle type="error" size="large" @click="onButtonEndCallClick">
                            <NIcon><PhoneXMarkIcon/></NIcon>
                        </NButton>
                        <NText>End call</NText>
                    </NFlex>
                </NFlex>
            </NGridItem>
        </NGrid>
    </NFlex>
</template>
<style>
</style>