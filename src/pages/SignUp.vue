<script setup lang="ts">
import { NInput, NButton, NForm, NGrid, NFormItemGi, NFlex } from 'naive-ui';
import AuthContainer from "../components/AuthContainer.vue";
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { SignUpForm, Error } from "../interfaces/index"
import { validateEmail } from "../helper/validateEmail"
import { useStore } from '../stores/store';

const user = ref<SignUpForm>({});
const error = ref<Error>({});

const router = useRouter();
const store = useStore();

function onBackToLoginButtonClick() {
    console.debug("onBackToLoginButtonClick");
    router.push({ name: 'SignIn' });
}

function validation() {
    if (!validateEmail(user.value?.email || "")) {
        console.debug("validation_Email");
        error.value = {subject: "Email", body: "Email"};
    }

    else if (user.value?.password === user.value.retype_password) {
        console.debug("validation_Password");
        error.value = {subject: "Password", body: "Password"};
    }
}

function onRegisterClick() {
    validation();
    if (error?.value) {
        console.debug("onRegisterClick_Error");
        //PUT LOGIC TO SHOW ERROR
        return;
    }
    store.user = user.value;
    //GO TO PAGE FOR AUTH
    console.debug("onRegisterClick");
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
            <NForm class="m-t-24px">
                <NGrid :cols="24">
                    <NFormItemGi :span="24" label="Username">
                        <NInput placeholder="ex. Don Juan" v-model:value="user.username"></NInput>
                    </NFormItemGi>

                    <NFormItemGi :span="24" label="Email">
                        <NInput placeholder="example@email.com" v-model:value="user.email"></NInput>
                    </NFormItemGi>

                    <NFormItemGi :span="24" label="Password">
                        <NInput type="password" placeholder="" v-model:value="user.password"></NInput>
                    </NFormItemGi>

                    <NFormItemGi :span="24" label="Re-type password">
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
