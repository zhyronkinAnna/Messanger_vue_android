<script setup lang="ts">
import { NInput, NButton, NCard, NForm, NGrid, NFormItemGi, NText, NFlex } from 'naive-ui';

</script>

<template>
    <NCard title="Welcome Back" class="p-24px max-w-400px mx-auto mt-15%">
        <NForm>
            <NGrid :cols="24">
                <NFormItemGi :span="24">
                    <template #label>
                        <NText>Email</NText>
                    </template>
                    <NInput placeholder="examle@email.com"></NInput>
                </NFormItemGi>
                <NFormItemGi :span="24">
                    <template #label>
                        <NFlex justify="space-between" class="w-full">
                            <NText>Password</NText>
                            <NButton tag="a" text text-color="#007AFFFF">
                                Forgot password?
                            </NButton>
                        </NFlex>
                    </template>
                    <NInput type="password" placeholder=""></NInput>
                </NFormItemGi>
                <NFormItemGi :span="24" :show-feedback="false" :show-label="false" class="mt-6px">
                    <NButton type="primary" block strong >
                        Login
                    </NButton>
                </NFormItemGi>
                <NFormItemGi :span="24" class="mx-auto" :show-feedback="false" :show-label="false">
                    <NText>Don't have account?&nbsp;</NText>
                    <NButton text tag="a" text-color="#007AFFFF">
                        Create new account
                    </NButton>
                </NFormItemGi>
            </NGrid>
        </NForm>
    </NCard>  
</template>

<style scoped>

</style>
