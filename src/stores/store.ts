import { IChat, IUser } from "../models/index";
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
        $reset,
    };
});
