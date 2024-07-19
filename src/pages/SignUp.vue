<script setup lang="ts">
import { NInput, NButton, NForm, NGrid, NFormItemGi, NFlex, useNotification, FormInst } from 'naive-ui';
import AuthContainer from "../components/AuthContainer.vue";
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { ISignUpForm, IError, IRequest } from "../models/index"
import { useStore } from '../stores/store';
import { useRules } from '../rules/rules';
import { useWsService } from '../services/wsServiceManager';
import { generateSHA256, isSecurePassword, showErrorNotification } from '../helper';

const user = ref<ISignUpForm>({});
const error = ref<IError>();

const router = useRouter();
const store = useStore();
const wsService = useWsService();
const signUpFormRef = ref<FormInst | null>(null);
const notification = useNotification();

const rules = useRules();

function onBackToLoginButtonClick() {
    router.push({ name: 'SignIn' });
}

function handleLoginError(): Boolean {
    if (error.value && error.value !== undefined && error.value !== null) {
        showErrorNotification(notification, error.value);
        error.value = undefined;
        return true;
    }
    return false;
}

async function validation() {
    await signUpFormRef.value?.validate((errors) => {
        if (errors) {
            error.value = { subject: "Sign up form", body: "Please ensure all fields are filled out correctly" };
            showErrorNotification(notification, error.value);
        }
    });
    if (user.value?.password !== user.value.retype_password) {
        error.value = {subject: "Passwords do not match", body: "Please ensure that both password fields contain the same password."};
    }
    else if(!isSecurePassword(user.value.password || "")) {
        error.value = { subject: "Weak password", body: "Please ensure your password is stronger by including a mix of uppercase letters, lowercase letters, numbers, and special characters." };
    }
}

async function onRegisterClick() {
    try {
        await validation();
        
        if (handleLoginError()) {
            return;
        }

        const hashedPassword = generateSHA256(user.value.password || "");

        store.user = { ...user.value };
        store.user.password = hashedPassword;

        const request: IRequest  = {
            command: "SignUp", 
            data: store.user
        };

        const respond = await wsService?.send(request);
        console.debug("respond", respond);

        store.previousRouteName = "SignUp";
        router.push({ name: 'EmailConfirmation' });
    }
    catch (error) {
        console.error(error);
    }
}

</script>

<template>
    <NFlex vertical justify="center" align="center" class="w-screen h-screen">
        <NFlex class="w-full max-w-400px">
            <NButton text tag="a" text-color="#6B6B6B" @click="onBackToLoginButtonClick">
                < Back to login
            </NButton>
        </NFlex>
        <AuthContainer container-name="Create account">
            <NForm class="m-t-24px" :rules="rules.EmailConfirmation" :model="user" ref="signUpFormRef">
                <NGrid :cols="24">
                    <NFormItemGi :span="24" label="Username" path="username">
                        <NInput placeholder="ex. Don Juan" v-model:value="user.username"></NInput>
                    </NFormItemGi>

                    <NFormItemGi :span="24" label="Email" path="email">
                        <NInput placeholder="example@email.com" v-model:value="user.email"></NInput>
                    </NFormItemGi>

                    <NFormItemGi :span="24" label="Password" path="password">
                        <NInput type="password" placeholder="" v-model:value="user.password"></NInput>
                    </NFormItemGi>

                    <NFormItemGi :span="24" label="Re-type password" path="retype_password">
                        <NInput type="password" placeholder="" v-model:value="user.retype_password"></NInput>
                    </NFormItemGi>

                    <NFormItemGi :span="24" :show-feedback="false" :show-label="false" class="mt-6px">
                        <NButton type="primary" block strong @click="onRegisterClick">
                            Register
                        </NButton>
                    </NFormItemGi>
                </NGrid>
            </NForm>
        </AuthContainer>
    </NFlex>
</template>

<style scoped>

</style>
