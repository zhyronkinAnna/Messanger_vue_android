<script setup lang="ts">
import { NInput, NButton, NForm, NGrid, NFormItemGi, NFlex, useNotification, FormInst } from 'naive-ui';
import AuthContainer from "../components/AuthContainer.vue" 
import { useRouter } from 'vue-router';
import { useStore } from '../stores/store';
import { IUser, IError, IRequest } from '../models';
import { ref } from 'vue';
import { formValidation, handleError, handleRequest } from '../helper';
import { useRules } from '../rules/rules';
import { useWsService } from '../services/wsServiceManager';

const user = ref<IUser>({});
const error = ref<IError>();

const router = useRouter();
const store = useStore();
const wsService = useWsService();
const notification = useNotification();
const forgotPasswordFormRef = ref<FormInst | null>(null);

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
    await formValidation(forgotPasswordFormRef.value!, notification);
}

async function onConfirmButtonClick() {
    try {
        await validation();

        if (handleLoginError()) {
            return;
        }

        store.user = { ...user.value };

        const request: IRequest  = {
            command: "ForgotPassword", 
            data: store.user
        };

        store.loading = true;
        const respond = await handleRequest(wsService!, request);
            
        if (respond?.errorMessage) {
            error.value = { subject: "Forgot password Error", body: respond?.errorMessage };
            if (handleLoginError()) {
                return;
            }
        }

        console.debug("respond", respond);

        router.push({ name: 'EmailConfirmation' });
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
        <AuthContainer container-name="Forgot password">
            <NForm class="m-t-24px" :rules="rules.ForgotPassword" :model="user" ref="forgotPasswordFormRef">
                <NGrid :cols="24">
                    <NFormItemGi :span="24" label="Email" path="email">
                        <NInput placeholder="example@email.com" v-model:value="user.email"></NInput>
                    </NFormItemGi>

                    <NFormItemGi :span="24" :show-feedback="false" :show-label="false" class="mt-6px">
                        <NButton type="primary" block strong @click="onConfirmButtonClick">
                            Confirm
                        </NButton>
                    </NFormItemGi>
                </NGrid>
            </NForm>
        </AuthContainer>
    </NFlex>
</template>

<style scoped>

</style>
