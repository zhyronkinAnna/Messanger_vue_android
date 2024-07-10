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

function onBackToLoginButtonClick() {
    console.debug("onBackToLoginButtonClick");
    router.push({ name: 'SignIn' });
}

function validation() {
    if (!validateEmail(user.value?.email || "")) {
        console.debug("validation_Email");
        error.value = {subject: "Email", body: "Email"};
    }
}

function onConfirmButtonClick() {
    validation();

    if (error?.value) {
        console.debug("onConfirmButtonClick_Error");
        //PUT LOGIC TO SHOW ERROR
        return;
    }

    store.user = user.value;
    console.debug("onConfirmButtonClick");
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
            <NForm class="m-t-24px">
                <NGrid :cols="24">
                    <NFormItemGi :span="24" label="Email">
                        <NInput placeholder="example@email.com"></NInput>
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
