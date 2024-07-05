<script setup lang="ts">
import { NInput, NButton, NForm, NGrid, NFormItemGi, NText, NFlex } from 'naive-ui';
import CenteredAuthContainer from "../components/CenteredAuthContainer.vue" 
</script>

<template>
    <CenteredAuthContainer container-name="Create account">
        <NForm class="m-t-24px">
            <NGrid :cols="24">
                <NFormItemGi :span="24" label="Username">
                    <NInput placeholder="ex. Don Juan"></NInput>
                </NFormItemGi>

                <NFormItemGi :span="24" label="Email">
                    <NInput placeholder="example@email.com"></NInput>
                </NFormItemGi>

                <NFormItemGi :span="24" label="Password">
                    <NInput type="password" placeholder=""></NInput>
                </NFormItemGi>

                <NFormItemGi :span="24" label="Re-type password">
                    <NInput type="password" placeholder=""></NInput>
                </NFormItemGi>

                <NFormItemGi :span="24" :show-feedback="false" :show-label="false" class="mt-6px">
                    <NButton type="primary" block strong >
                        Register
                    </NButton>
                </NFormItemGi>
            </NGrid>
        </NForm>
    </CenteredAuthContainer>
</template>

<style scoped>

</style>
