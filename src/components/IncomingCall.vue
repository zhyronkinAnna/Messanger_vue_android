<script setup lang="ts">
import { NAvatar, NButton, NFlex, NGrid, NGridItem, NH3, NIcon, NText } from 'naive-ui';
import { useStore } from '../stores/store';
import { PhoneXMarkIcon, PhoneIcon } from '@heroicons/vue/24/outline';
import { CallSignalTypeEnum, IPrivateChat, NotificationTypes } from '../models';
import { handleRequest } from '../helper';
import { useWsService } from '../services/wsServiceManager';
const store = useStore();
const wsService = useWsService();
async function handleIncomingCall() {
    store.peerConnection = new RTCPeerConnection({
        iceServers: [{ urls: "stun:stun.l.google.com:19302" }]
    });
    store.peerConnection.ontrack = (event) => {
        console.log("Получен медиапоток:", event.streams[0]);
        const audioElement = document.createElement("audio");
        audioElement.srcObject = event.streams[0];
        audioElement.autoplay = true;
        document.body.appendChild(audioElement);
    };
    store.peerConnection.onconnectionstatechange = () => {
        console.log("Состояние соединения:", store.peerConnection!.connectionState);
        if (store.peerConnection!.connectionState === "connected") {
            console.log("Соединение установлено!");
        }
    };
    let localStream: MediaStream | null = null;
    try {
        localStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        console.log("Локальные треки:", localStream.getTracks());
        localStream.getTracks().forEach(track => store.peerConnection!.addTrack(track, localStream!));
    } catch (error) {
        console.error("Ошибка при доступе к микрофону на принимающей стороне:", error);
        return;
    }
    await store.peerConnection.setRemoteDescription(new RTCSessionDescription({
        type: "offer",
        sdp: store.dataForCall!.Sdp
    }));
    const answer = await store.peerConnection.createAnswer();
    await store.peerConnection.setLocalDescription(answer);
    const answerRequest = {
        command: "HandleCall",
        data: {
            TargetUserId: store.dataForCall!.SenderUserId,
            Type: CallSignalTypeEnum.Answer,
            Sdp: answer.sdp,
            Candidate: null,
            notificationType: NotificationTypes.CallAnswer,
            SenderUserId: store.user?.id
        }
    };
    handleRequest(wsService!, answerRequest);
    store.peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
            const candidateRequest = {
                command: "HandleCall",
                data: {
                    TargetUserId: store.dataForCall!.SenderUserId,
                    Type: CallSignalTypeEnum.Candidate,
                    Candidate: event.candidate.candidate,
                    SenderUserId: store.user?.id
                }
            };
            handleRequest(wsService!, candidateRequest);
        }
    };
}
function onButtonAcceptClick()
{
    store.activeCall = true;
    store.incomingCall = false;
    handleIncomingCall();
}
function onButtonDeclineClick()
{
    store.callPanel = false;
    store.incomingCall = false;
}
</script>
<template>
    <NFlex class="w-full items-center">
        <NFlex class="w-full" justify="center">
            <NAvatar
                class="avatar-upload"
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
                    <NText strong>is calling you...</NText>
                </NFlex>                        
            </NGridItem>
            <NGridItem>
                <NGrid :cols="2">
                    <NGridItem>
                        <NFlex vertical align="center">
                            <NButton strong secondary circle type="error" size="large" @click="onButtonDeclineClick">
                                <NIcon><PhoneXMarkIcon/></NIcon>
                            </NButton>
                            <NText>Decline</NText>
                        </NFlex>
                    </NGridItem>
                    <NGridItem>
                        <NFlex vertical align="center">
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
<style>
</style>