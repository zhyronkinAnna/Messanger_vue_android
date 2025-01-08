<script setup lang="ts">
import { NInput, NButton, NForm, NGrid, NFormItemGi, NFlex, useNotification, FormInst } from 'naive-ui';
import AuthContainer from "../components/AuthContainer.vue";
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { ISignUpForm, IError, IRequest } from "../models"
import { useStore } from '../stores/store';
import { formValidation, generateSHA256, handleError, handleRequest, isSecurePassword } from '../helper';
import { useRules } from '../rules/rules';
import { useWsService } from '../services/wsServiceManager';

const user = ref<ISignUpForm>({});
const error = ref<IError>();

const router = useRouter();
const store = useStore();
const wsService = useWsService();
const notification = useNotification();
const setNewPasswordFormRef = ref<FormInst | null>(null);

const rules = useRules();

function onBackToLoginButtonClick() {
    router.push({ name: 'SignIn' });
}

function handleLoginError(): boolean {
    const result = handleError(error.value, notification);
    error.value = undefined;
    return result;
}

async function validation() {
    await formValidation(setNewPasswordFormRef.value!, notification);

    if (!isSecurePassword(user.value?.password || "")) {
        error.value = {subject: "Password", body: "Password"};
    }
    else if (user.value?.password !== user.value.retype_password) {
        error.value = {subject: "Password1", body: "Password1"};
    }
}

async function onSetNewPasswordClick() {
    try {
        await validation();

        if (handleLoginError()) {
            return;
        }

        const hashedPassword = generateSHA256(user.value.password || "");
        
        store.user!.password = hashedPassword;

        const request: IRequest  = {
            command: "SetNewPassword", 
            data: store.user
        };

        store.loading = true;
        const respond = await handleRequest(wsService!, request);
        
        if (respond?.errorMessage) {
            error.value = { subject: "Set new password Error", body: respond?.errorMessage };
            if (handleLoginError()) {
                return;
            }
        }

        router.push({ name: 'SignIn' });
    }
    catch (error) {
        console.error(error);
    }
    finally {
        store.loading = false;
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
        <AuthContainer container-name="Set new password">
            <NForm class="m-t-24px" :rules="rules.SetNewPassword" :model="user" ref="setNewPasswordFormRef">
                <NGrid :cols="24">
                    <NFormItemGi :span="24" label="Password" path="password">
                        <NInput type="password" placeholder="" v-model:value="user.password"></NInput>
                    </NFormItemGi>

                    <NFormItemGi :span="24" label="Re-type password" path="retype_password">
                        <NInput type="password" placeholder="" v-model:value="user.retype_password"></NInput>
                    </NFormItemGi>

                    <NFormItemGi :span="24" :show-feedback="false" :show-label="false" class="mt-6px">
                        <NButton type="primary" block strong @click="onSetNewPasswordClick">
                            Set new password
                        </NButton>
                    </NFormItemGi>
                </NGrid>
            </NForm>
        </AuthContainer>
    </NFlex>
</template>

<style scoped>

</style>
