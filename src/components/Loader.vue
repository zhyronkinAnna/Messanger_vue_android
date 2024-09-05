<script setup lang="ts">
import { NModal, NCard, NFlex, NSpin, NText } from 'naive-ui';
</script>

<template>
    <NModal :show="true">
        <NCard style="width: 30vw; height: 30vh" :bordered="false" size="small" align="center" justify="center" content-style="padding: 0;">
            <NFlex vertical class="w-30vw h-30vh" justify="center">
                <NSpin size="large"/>
                <NText strong>Loading</NText>
            </NFlex>
        </NCard>
    </NModal>
</template>

<style scoped>
</style>
