import { ICallSignalData, IChat, IUser } from "../models/index";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useStore = defineStore("store", () => {
    const user = ref<IUser | undefined>(undefined);
    const previousRoute = ref<string | undefined | null>(undefined);
    const isConnected = ref<boolean>(false);
    const loading = ref<boolean>(false);
    const showSettings = ref<boolean>(false);
    const showUserInfo = ref<boolean>(false);
    const showSetAvatar = ref<boolean>(false);
    const cropperSrc  = ref<string | ArrayBuffer | null | undefined>(undefined);
    const showEmojiPicker = ref<boolean>(false);
    const selectedChat = ref<IChat | null>(null);
    const allChats = ref<IChat[]>([]);
    const inputRef = ref<any>(null);
    const messangerNotification = ref<any>(undefined);
    const virtualListMessagesInst = ref<any>(null);
    const findChats = ref<IChat[] | null>(null)
    const inputSearchInstRef = ref<any>(null);
    const router = ref<any>(null);
    const callPanel = ref<boolean>(false);
    const outgoingCall = ref<boolean>(false);
    const incomingCall = ref<boolean>(false);
    const activeCall = ref<boolean>(false);
    const dataForCall = ref<ICallSignalData | null>(null);
    const peerConnection = ref<RTCPeerConnection | null>(null);
    const accessToken = ref<string | null>(localStorage.getItem("access-token"));
    function setAccessToken(token: string) {
        accessToken.value = token;
        localStorage.setItem("access-token", token);
    }

    function $reset() {
        user.value = undefined;
        previousRoute.value = undefined;
        loading.value = false;
        showSettings.value = false;
        showUserInfo.value = false;
        showSetAvatar.value = false;
        cropperSrc.value = undefined;
        showEmojiPicker.value = false;
        selectedChat.value = null;
        localStorage.removeItem("access-token");
    }

    return {
        user,
        previousRoute,
        isConnected,
        loading,
        showSettings,
        showUserInfo,
        showSetAvatar,
        cropperSrc,
        showEmojiPicker,
        selectedChat,
        allChats,
        inputRef,
        messangerNotification,
        virtualListMessagesInst,
        findChats,
        inputSearchInstRef,
        $reset,
        accessToken,
        setAccessToken,
        router,
        callPanel,
        outgoingCall,
        incomingCall,
        activeCall,
        dataForCall,
        peerConnection
    };
});
