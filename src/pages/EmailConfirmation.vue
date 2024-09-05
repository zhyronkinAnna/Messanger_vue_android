<script setup lang="ts">
import { NInput, NButton, NForm, NGrid, NFormItemGi, NText, NFlex, useNotification, FormInst } from 'naive-ui';
import AuthContainer from "../components/AuthContainer.vue" 
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { IError } from '../models';
import { useStore } from '../stores/store';
import { formValidation, handleError, handleRequest, showErrorNotification, showInfoNotification } from '../helper';
import { useWsService } from '../services/wsServiceManager';
import { useRules } from '../rules/rules';

const error = ref<IError>();
const emailConfirmationFormModel = ref({ user: null, code: '' });
const emailConfirmationFormRef = ref<FormInst | null>(null);

const router = useRouter();
const store = useStore();
const notification = useNotification();
const wsService = useWsService();
const rules = useRules();

function onClickToResendButtonClick() {
}

function handleLoginError(): boolean {
    const result = handleError(error.value, notification);
    error.value = undefined;
    return result;
}

async function validation() {
    await formValidation(emailConfirmationFormRef.value!, notification);
}

function onBackToLoginButtonClick() {
    router.push({ name: 'SignIn' });
}

async function onConfirmButtonClick() {
    await validation();

    const requestConfig: Record<string, { insertUserToDatabase: boolean, nextRoute: string }> = {
        ForgotPassword: { insertUserToDatabase: false, nextRoute: 'SetNewPassword' },
        SignUp: { insertUserToDatabase: true, nextRoute: 'SignIn' }
    };

    const previousRoute = store.previousRoute ?? '';
    const routeConfig = requestConfig[previousRoute];
    
    if (!routeConfig) return; // early return if the route is not supported

    const request = {
        command: "IsCodeRight",
        data: {
            user: store.user,
            authenticationCode: emailConfirmationFormModel.value.code,
            insertUserToDatabase: routeConfig.insertUserToDatabase
        }
    };

    try {
        store.loading = true;
        const respond = await handleRequest(wsService!, request);
        
        if (respond?.errorMessage) {
            error.value = { subject: "Email confirmation Error", body: respond?.errorMessage };
            if (handleLoginError()) {
                return;
            }
        }

        if (previousRoute === 'SignUp') {
            showInfoNotification(notification, { subject: "Success", body: "User was successfully created" });
        }

        console.debug("respond", respond);

        router.push({ name: routeConfig.nextRoute });
    } catch (e) {
        console.error("Error in onConfirmButtonClick:", e);
    } finally {
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
        <AuthContainer container-name="Email Authentication">
            <NForm class="m-t-24px" :rules="rules.EmailConfirmation" :model="emailConfirmationFormModel" ref="emailConfirmationFormRef">
                <NGrid :cols="24">
                    <NFormItemGi :span="24" label="Code" path="code">
                        <NInput placeholder="" v-model:value="emailConfirmationFormModel.code"></NInput>
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
