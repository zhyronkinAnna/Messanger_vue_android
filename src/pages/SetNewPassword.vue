<script setup lang="ts">
import { NInput, NButton, NForm, NGrid, NFormItemGi, NFlex, useNotification } from 'naive-ui';
import AuthContainer from "../components/AuthContainer.vue";
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { SignUpForm, Error } from "../interfaces/index"
import { useStore } from '../stores/store';
import { isSecurePassword } from '../helper';

const user = ref<SignUpForm>({});
const error = ref<Error>();

const router = useRouter();
const store = useStore();
const notification = useNotification();

function onBackToLoginButtonClick() {
    console.debug("onBackToLoginButtonClick");
    router.push({ name: 'SignIn' });
}

function handleLoginError(): Boolean {
    if (error && error.value !== undefined && error.value !== null) {
        console.debug("onLoginButtonClick_Error", error.value);
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

function validation() {
    if (!isSecurePassword(user.value?.password || "")) {
        console.debug("isSecurePassword_Password");
        error.value = {subject: "Password", body: "Password"};
    }
    else if (user.value?.password === user.value.retype_password) {
        console.debug("validation_Password");
        error.value = {subject: "Password", body: "Password"};
    }
}

function onSetNewPasswordClick() {
    validation();

    if (handleLoginError()) {
        return;
    }

    store.user = user.value;
    console.debug("onSetNewPasswordClick");
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
            <NForm class="m-t-24px">
                <NGrid :cols="24">
                    <NFormItemGi :span="24" label="Password">
                        <NInput type="password" placeholder="" v-model:value="user.password"></NInput>
                    </NFormItemGi>

                    <NFormItemGi :span="24" label="Re-type password">
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
