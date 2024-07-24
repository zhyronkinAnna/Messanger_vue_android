<script setup lang="ts">
import { NInput, NButton, NForm, NGrid, NFormItemGi, NFlex } from 'naive-ui';
import AuthContainer from "../components/AuthContainer.vue";
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { ISignUpForm } from "../models/index"
import type { FormItemRule } from 'naive-ui'

const user = ref<ISignUpForm>({});

const rules = {
    email: {
        validator(rule: FormItemRule, value: string) {
            return value === "Dimi1@gmail.com"
        },
        trigger: ['blur', 'input'],
        message: 'Please input username'
    }
};

const router = useRouter();

function onBackToLoginButtonClick() {
    router.push({ name: 'SignIn' });
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
            <NForm class="m-t-24px" :model="user" :rules="rules">
                <NGrid :cols="24">
                    <NFormItemGi :span="24" label="Email" path="email">
                        <NInput placeholder="example@email.com" v-model:value="user.email"></NInput>
                    </NFormItemGi>
                </NGrid>
                <NGrid :cols="24">
                    <NFormItemGi :span="24" label="Username" path="username">
                        <NInput placeholder="ex. Don Juan" v-model:value="user.username"></NInput>
                    </NFormItemGi>
                </NGrid>
            </NForm>
        </AuthContainer>
    </NFlex>
</template>

<style scoped>
</style>
