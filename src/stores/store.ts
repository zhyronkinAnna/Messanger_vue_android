import { IUser } from "../models/index"; // Убедитесь, что путь правильный
import { defineStore } from "pinia";
import { ref } from "vue";

export const useStore = defineStore("store", () => {
    const user = ref<IUser | undefined>(undefined);
    const previousRoute = ref<string | undefined | null>(undefined);
    const isConnected = ref<boolean>(false);
    const loading = ref<boolean>(false);
    const showSettings = ref<boolean>(false);
    const showUserInfo = ref<boolean>(false);
    
    return {
        user,
        previousRoute,
        isConnected,
        loading,
        showSettings,
        showUserInfo
    };
});
