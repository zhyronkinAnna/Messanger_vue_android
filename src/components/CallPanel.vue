<script setup lang="ts">
import { NCard, NForm, NModal } from 'naive-ui';
import { useStore } from '../stores/store';
import IncomingCall from './IncomingCall.vue';
import ActiveCall from './ActiveCall.vue';
import OutgoingCall from './OutgoingCall.vue';

const store = useStore();
</script>
<template>
    <NModal v-model:show="store.callPanel" :mask-closable="false">
        <NCard
            class="w-350px"
            :bordered="false"
            size="huge"
            role="dialog"
            aria-modal="true"
        >
            <NForm>
                <IncomingCall v-if="store.incomingCall"/>
                <OutgoingCall v-if="store.outgoingCall"/>
                <ActiveCall v-if="store.activeCall"/>
            </NForm>
        </NCard>
    </NModal>
</template>
<style>
</style>