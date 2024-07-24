<script setup lang="ts">
import { NInput, NButton, NForm, NGrid, NFormItemGi, NText, NFlex, useNotification, FormInst } from 'naive-ui';
import AuthContainer from "../components/AuthContainer.vue" 
import { useRouter } from 'vue-router';
import { useStore } from '../stores/store';
import { IUser, IError } from '../models/index';
import { ref } from 'vue';
import { showErrorNotification } from '../helper';
import { useRules } from '../rules/rules';

const user = ref<IUser>({});
const error = ref<IError>();

const router = useRouter();
const store = useStore();
const notification = useNotification();
const forgotPasswordFormRef = ref<FormInst | null>(null);

const rules = useRules();

function onBackToLoginButtonClick() {
    router.push({ name: 'SignIn' });
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

async function validation() {
    await forgotPasswordFormRef.value?.validate((errors) => {
        if (errors) {
            error.value = { subject: "Email Authentication", body: "Please ensure all fields are filled out correctly" };
            showErrorNotification(notification, error.value);
            error.value = undefined;
        }
    });
}

async function onConfirmButtonClick() {
    await validation();

    if (handleLoginError()) {
        return;
    }

    store.user = user.value;
    router.push({ name: 'EmailConfirmation' });
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
