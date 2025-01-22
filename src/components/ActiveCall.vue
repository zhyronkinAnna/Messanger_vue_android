<script setup lang="ts">
import { NAvatar, NButton, NFlex, NGrid, NGridItem, NH3, NIcon, NText } from 'naive-ui';
import { useStore } from '../stores/store';
import { PhoneXMarkIcon } from '@heroicons/vue/24/outline';
import { IPrivateChat } from '../models';
import { endCallAndSendRequestToReceiver } from '../helper';
import { useWsService } from '../services/wsServiceManager';

// Initialize the store and WebSocket service
const store = useStore();
const wsService = useWsService(); 

// Function to handle the end call button click
function onButtonEndCallClick() {
    endCallAndSendRequestToReceiver(store, wsService);
    store.callPanel = false;
    store.activeCall = false;
}
</script>

<template>
    <NFlex class="w-full items-center">
        <!-- Avatar of the user in the active call -->
        <NFlex class="w-full" justify="center">
            <NAvatar
                round
                :size="150"
                :src="store.userCall!.avatar_url"
            />
        </NFlex>
        
        <!-- Username of the user in the active call -->
        <NFlex class="w-full" justify="center">
            <NH3 strong>{{ store.userCall!.username }}</NH3>
        </NFlex>
        
        <!-- Grid layout for call duration and end call button -->
        <NGrid :cols="1" :y-gap="100">
            <!-- Call duration display -->
            <NGridItem>
                <NFlex justify="center">
                    <NText strong>00:01</NText>
                </NFlex>                        
            </NGridItem>
            
            <!-- End call button -->
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