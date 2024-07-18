<script setup lang="ts">
import { NInput, NButton, NForm, NGrid, NFormItemGi, NText, NFlex, useNotification } from 'naive-ui';
import AuthContainer from "../components/AuthContainer.vue" 
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { IError } from '../models/index';
import { useStore } from '../stores/store';

const error = ref<IError>();
const code = ref<string>();

const router = useRouter();
const store = useStore();
const notification = useNotification();

function onClickToResendButtonClick() {
}

function handleLoginError(): Boolean {
    if (error.value && error.value !== undefined && error.value !== null) {
        notification.error({
            title: error.value?.subject,
            content: error.value?.body,
            duration: 1500
        });
        error.value = undefined;
        return true;
    }
    return false;
}

function onBackToLoginButtonClick() {
    router.push({ name: 'SignIn' });
}

function onConfirmButtonClick() {
    if(store.previousRouteName === "ForgotPassword"){
        router.push({ name: 'SetNewPassword' });
    }
    else if(store.previousRouteName === "SignUp"){
        router.push({ name: 'SignIn' });
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
        <AuthContainer container-name="Email Authentication">
            <NForm class="m-t-24px">
                <NGrid :cols="24">
                    <NFormItemGi :span="24" label="Code">
                        <NInput placeholder="" v-model:value="code"></NInput>
                    </NFormItemGi>

                    <NFormItemGi :span="24" :show-feedback="false" :show-label="false" class="mt-6px">
                        <NButton type="primary" block strong @click="onConfirmButtonClick">
                            Confirm
                        </NButton>
                    </NFormItemGi>

                    <NFormItemGi :span="24" class="mx-auto" :show-feedback="false" :show-label="false">
                        <NText>Did't get email?&nbsp;</NText>
                        <NButton text tag="a" text-color="#007AFFFF" @click="onClickToResendButtonClick">
                            Click to resend
                        </NButton>
                    </NFormItemGi>
                </NGrid>
            </NForm>
        </AuthContainer>
    </NFlex>
</template>

<style scoped>

</style>
