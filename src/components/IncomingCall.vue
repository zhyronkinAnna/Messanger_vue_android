<script setup lang="ts">
import { NAvatar, NButton, NFlex, NGrid, NGridItem, NH3, NIcon, NText } from 'naive-ui';
import { useStore } from '../stores/store';
import { PhoneXMarkIcon, PhoneIcon } from '@heroicons/vue/24/outline';
import { IPrivateChat } from '../models';
import { endCallAndSendRequestToReceiver, handleIncomingCall } from '../helper';
import { useWsService } from '../services/wsServiceManager';

// Initialize the store and WebSocket service
const store = useStore();
const wsService = useWsService();

// Function to handle the accept button click
async function onButtonAcceptClick() {
    store.activeCall = true;
    store.incomingCall = false;
    await handleIncomingCall(store, wsService);
}

// Function to handle the decline button click
function onButtonDeclineClick() {
    endCallAndSendRequestToReceiver(store, wsService);
    store.callPanel = false;
    store.incomingCall = false;
}

</script>

<template>
    <NFlex class="w-full items-center">
        <NFlex class="w-full" justify="center">
            <!-- Display the avatar of the user who is calling -->
            <NAvatar
                class="avatar-upload"
                round
                :size="150"
                :src="store.userCall!.avatar_url"
            />
        </NFlex>
        <NFlex class="w-full" justify="center">
            <!-- Display the username of the user who is calling -->
            <NH3 strong>{{ store.userCall!.username }}</NH3>        
        </NFlex>
        <NGrid :cols="1" :y-gap="100">
            <NGridItem>
                <NFlex justify="center">
                    <!-- Display the calling message -->
                    <NText strong>is calling you...</NText>
                </NFlex>                        
            </NGridItem>
            <NGridItem>
                <NGrid :cols="2">
                    <NGridItem>
                        <NFlex vertical align="center">
                            <!-- Decline button -->
                            <NButton strong secondary circle type="error" size="large" @click="onButtonDeclineClick">
                                <NIcon><PhoneXMarkIcon/></NIcon>
                            </NButton>
                            <NText>Decline</NText>
                        </NFlex>
                    </NGridItem>
                    <NGridItem>
                        <NFlex vertical align="center">
                            <!-- Accept button -->
                            <NButton strong secondary circle type="success" size="large" @click="onButtonAcceptClick">
                                <NIcon><PhoneIcon/></NIcon>
                            </NButton>
                            <NText>Accept</NText>
                        </NFlex>
                    </NGridItem>
                </NGrid>
            </NGridItem>
        </NGrid>
    </NFlex>
</template>