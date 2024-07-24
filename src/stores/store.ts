import { IUser } from "../models/index";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useStore = defineStore("store", () => {
    const user = ref<IUser>();
    const previousRoute = ref<string | undefined | null>(undefined);
    const isConected = ref<Boolean>(false);
    const loading = ref<Boolean>(false);
    
    return{
        user,
        previousRoute,
        isConected,
        loading
    }
});