<script setup lang="ts">
import { NCard, NForm, NModal } from 'naive-ui';
import { useStore } from '../stores/store';
import IncomingCall from './IncomingCall.vue';
import ActiveCall from './ActiveCall.vue';
import OutgoingCall from './OutgoingCall.vue';

// Initialize the store
const store = useStore();

</script>

<template>
    <!-- Modal for call panel -->
    <NModal v-model:show="store.callPanel" :mask-closable="false">
        <!-- Card container for the call panel -->
        <NCard
            class="w-350px"
            :bordered="false"
            size="huge"
            role="dialog"
            aria-modal="true"
        >
            <!-- Form to handle different call states -->
            <NForm>
                <!-- Component for incoming call -->
                <IncomingCall v-if="store.incomingCall"/>
                <!-- Component for outgoing call -->
                <OutgoingCall v-if="store.outgoingCall"/>
                <!-- Component for active call -->
                <ActiveCall v-if="store.activeCall"/>
            </NForm>
        </NCard>
    </NModal>
</template>