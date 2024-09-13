<script setup lang="ts">
import { NInput, NButton, NForm, NGrid, NFormItemGi, NText, NFlex, useNotification, FormInst, c } from 'naive-ui';
import AuthContainer from "../components/AuthContainer.vue";
import { useRouter } from 'vue-router';
import { useStore } from '../stores/store';
import { IUser, IError, IRequest, convertToIUser } from '../models';
import { ref } from 'vue';
import { generateSHA256, isSecurePassword, formValidation, handleError, handleRequest } from '../helper';
import { useWsService } from '../services/wsServiceManager';
import { useRules } from '../rules/rules';
import { onMounted } from 'vue';

const user = ref<IUser>({});
const error = ref<IError | undefined>(undefined);

const router = useRouter();
const store = useStore();
const wsService = useWsService();
const signInFormRef = ref<FormInst | undefined>(undefined);
const notification = useNotification();

const rules = useRules();

function onCreateNewAccountButtonClick() {
    router.push({ name: 'SignUp' });
}

function onForgotPasswordButtonClick() {
    router.push({ name: 'ForgotPassword' });
}

function handleLoginError(): boolean {
    const result = handleError(error.value, notification);
    error.value = undefined;
    return result;
}

async function validation() {
    await formValidation(signInFormRef.value!, notification);

    if(!isSecurePassword(user.value.password || "")) {
        error.value = { subject: "Invalid email or password", body: "We couldn't find a user with the provided email and password. Please check your credentials and try again." };
    }
}

onMounted(()=>{
    store.$reset();
})

async function onLoginButtonClick() {
    try {
        await validation();

        if (handleLoginError()) {
            return;
        }

        const hashedPassword = generateSHA256(user.value.password || "");

        store.user = { ...user.value };
        store.user.password = hashedPassword;

        const request: IRequest  = {
            command: "SignIn", 
            data: store.user
        };

        store.loading = true;
        const respond = await handleRequest(wsService!, request);

        if (respond?.errorMessage) {
            error.value = { subject: "Sign in Error", body: respond?.errorMessage };
            if (handleLoginError()) {
                return;
            }
        }

        console.debug("respond", respond?.data);
        store.user = convertToIUser(respond?.data);

        router.push({ name: 'Messanger' });
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
        <AuthContainer container-name="Welcome Back">
            <NForm class="m-t-24px" :rules="rules.SignIn" :model="user" ref="signInFormRef">
                <NGrid :cols="24">
                    <NFormItemGi :span="24" label="Email" path="email">
                        <NInput placeholder="example@email.com" v-model:value="user.email"></NInput>
                    </NFormItemGi>

                    <NFormItemGi :span="24" path="password">
                        <template #label>
                            <NFlex justify="space-between" class="w-full">
                                <NText>Password</NText>
                                <NButton tag="a" text text-color="#007AFFFF" @click="onForgotPasswordButtonClick">
                                    Forgot password?
                                </NButton>
                            </NFlex>
                        </template>
                        <NInput type="password" show-password-on="click" placeholder="" v-model:value="user.password"></NInput>
                    </NFormItemGi>

                    <NFormItemGi :span="24" :show-feedback="false" :show-label="false" class="mt-6px">
                        <NButton type="primary" block strong @click="onLoginButtonClick">
                            Login
                        </NButton>
                    </NFormItemGi>

                    <NFormItemGi :span="24" class="mx-auto" :show-feedback="false" :show-label="false">
                        <NText>Don't have account?&nbsp;</NText>
                        <NButton text tag="a" text-color="#007AFFFF" @click="onCreateNewAccountButtonClick">
                            Create new account
                        </NButton>
                    </NFormItemGi>
                </NGrid>
            </NForm>
        </AuthContainer>
    </NFlex>
</template>

<style scoped>
</style>
