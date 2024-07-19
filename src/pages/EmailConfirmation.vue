<script setup lang="ts">
import { NInput, NButton, NForm, NGrid, NFormItemGi, NText, NFlex, useNotification, FormInst } from 'naive-ui';
import AuthContainer from "../components/AuthContainer.vue" 
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { IError, IRequest } from '../models/index';
import { useStore } from '../stores/store';
import { showErrorNotification } from '../helper';
import { useWsService } from '../services/wsServiceManager';
import { useRules } from '../rules/rules';

const error = ref<IError>();
const formModel = ref({ code: '' });

const router = useRouter();
const store = useStore();
const notification = useNotification();
const wsService = useWsService();
const emailConfirmationFormRef = ref<FormInst | null>(null);

const rules = useRules();

function onClickToResendButtonClick() {
}

function handleLoginError(): Boolean {
    if (error.value && error.value !== undefined && error.value !== null) {
        showErrorNotification(notification, error.value);
        error.value = undefined;
        return true;
    }
    error.value = undefined;
    return false;
}

async function validation() {
    await emailConfirmationFormRef.value?.validate((errors) => {
        if (errors) {
            error.value = { subject: "Email Authentication", body: "Please ensure all fields are filled out correctly" };
            showErrorNotification(notification, error.value);
        }
    });
}

function onBackToLoginButtonClick() {
    router.push({ name: 'SignIn' });
}

async function onConfirmButtonClick() {
    await validation()

    const request: IRequest  = {
            command: "SignUp", 
            data: store.user
        };

    const respond = await wsService?.send(request);
    console.debug("respond", respond);

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
            <NForm class="m-t-24px" :rules="rules.EmailConfirmation" :model="formModel" ref="emailConfirmationFormRef">
                <NGrid :cols="24">
                    <NFormItemGi :span="24" label="Code" path="code">
                        <NInput placeholder="" v-model:value="formModel.code"></NInput>
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
