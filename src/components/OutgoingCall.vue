<script setup lang="ts">
import { NAvatar, NButton, NFlex, NGrid, NGridItem, NH3, NIcon, NText } from 'naive-ui';
import { useStore } from '../stores/store';
import { PhoneXMarkIcon } from '@heroicons/vue/24/outline';
import { CallSignalTypeEnum, IPrivateChat, IRequest, NotificationTypes } from '../models';
import { onMounted } from 'vue';
import { useWsService } from '../services/wsServiceManager';
import { handleRequest } from '../helper';

const store = useStore();
const wsService = useWsService();
function onButtonEndCallClick()
{
    store.callPanel = false;
    store.outgoingCall = false;
}

onMounted(async () => {
    console.log("Outgoing call");
    store.peerConnection = new RTCPeerConnection({
        iceServers: [{ urls: "stun:stun.l.google.com:19302" }]
    });
    store.peerConnection.ontrack = (event) => {
        console.log("Получен медиапоток:", event.streams[0]);
        const audioElement = document.createElement("audio");
        audioElement.srcObject = event.streams[0]; // Полученный поток
        audioElement.autoplay = true; // Воспроизведение потока
        document.body.appendChild(audioElement); // Добавляем элемент на страницу
    };
    store.peerConnection.onconnectionstatechange = () => {
    console.log("Состояние соединения:", store.peerConnection!.connectionState);
    if (store.peerConnection!.connectionState === "connected") {
        console.log("Соединение установлено!");
    }
};
    let localStream: MediaStream | null  = null;
    try {
        localStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        console.log("Локальные треки:", localStream.getTracks());
        localStream.getTracks().forEach(track => store.peerConnection!.addTrack(track, localStream!));
    } catch (error) {
        console.error("Ошибка при доступе к микрофону:", error);
        return;
    }
    const offer = await store.peerConnection.createOffer();
    await store.peerConnection.setLocalDescription(offer);
    const request: IRequest  = {
        command: "HandleCall", 
        data: {
            TargetUserId: (store.selectedChat as IPrivateChat)?.user.id,
            Type: CallSignalTypeEnum.Offer,
            Sdp: offer.sdp,
            Candidate: null,
            notificationType: NotificationTypes.CallOffer,
            SenderUserId: store.user?.id,
        }
    };
    handleRequest(wsService!, request);
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