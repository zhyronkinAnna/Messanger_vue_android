import { User } from "../interfaces/index";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useStore = defineStore("store", () => {
    const user = ref<User>();
    const previousRouteName = ref<string>('');

    return{
        user,
        previousRouteName
    }
});