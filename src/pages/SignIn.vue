<script setup lang="ts">
import { NInput, NButton, NForm, NGrid, NFormItemGi, NText, NFlex } from 'naive-ui';
import AuthContainer from "../components/AuthContainer.vue" 
import { useRouter } from 'vue-router';
import { useStore } from '../stores/store';
import { User, Error } from '../interfaces/index';
import { validateEmail } from "../helper/validateEmail"
import { ref } from 'vue';

const user = ref<User>({});
const error = ref<Error>({});

const router = useRouter();
const store = useStore();

function onCreateNewAccountButtonClick() {
    console.debug("onCreateNewAccountButtonClick");
    router.push({ name: 'SignUp' });
}

function onForgotPasswordButtonClick() {
    console.debug("onForgotPasswordButtonClick");
    router.push({ name: 'ForgotPassword' });
}

function validation() {
    if (!validateEmail(user.value?.email || "")) {
        console.debug("validation_Email");
        error.value = {subject: "Email", body: "Email"};
    }
}

function onLoginButtonClick() {
    validation();

    if (error?.value) {
        console.debug("onLoginButtonClick_Error");
        //PUT LOGIC TO SHOW ERROR
        return;
    }

    store.user = user.value;
    console.debug("onLoginButtonClick");
}

</script>

<template>
    <NFlex vertical justify="center" align="center" class="w-screen h-screen">
        <AuthContainer container-name="Welcome Back">
            <NForm class="m-t-24px">
                <NGrid :cols="24">
                    <NFormItemGi :span="24" label="Email">
                        <NInput placeholder="example@email.com" v-model:value="user.email"></NInput>
                    </NFormItemGi>

                    <NFormItemGi :span="24">
                        <template #label>
                            <NFlex justify="space-between" class="w-full">
                                <NText>Password</NText>
                                <NButton tag="a" text text-color="#007AFFFF" @click="onForgotPasswordButtonClick">
                                    Forgot password?
                                </NButton>
                            </NFlex>
                        </template>
                        <NInput type="password" placeholder="" v-model:value="user.password"></NInput>
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
