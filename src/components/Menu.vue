<script setup lang="ts">
import { NFlex, NIcon, NButton} from 'naive-ui';
import { useStore } from '../stores/store';
import { ArrowLeftEndOnRectangleIcon, Cog6ToothIcon } from '@heroicons/vue/24/outline';
import { useRouter } from 'vue-router';
import { IRequest } from '../models';
import { useWsService } from '../services/wsServiceManager';
import { handleRequest } from '../helper';

const store = useStore();
const router = useRouter();
const wsService = useWsService();

function onSettingsButtonClick()
{
    store.showSettings = true;
}

async function onButtonLogoutClick()
{
    try {
        const request: IRequest  = {
            command: "LogOut", 
            data: {}
        };

        handleRequest(wsService!, request, false);
    } 
    catch (error) {
        console.error(error);
    }
    finally {
        store.loading = false;
    }
    router.push({ name: 'SignIn' });
} 
</script>

<template>
    <NFlex direction="horizontal" align="center">
        <NButton @click="onSettingsButtonClick" :bordered="false" circle size="medium"  ghost color="#898989">
            <template #icon>
                <NIcon :size="25"><Cog6ToothIcon/></NIcon>
            </template>
        </NButton>
        <NButton @click="onButtonLogoutClick" :bordered="false" circle size="medium"  ghost color="#898989">
            <template #icon>
                <NIcon :size="25"><ArrowLeftEndOnRectangleIcon/></NIcon>
            </template>
        </NButton>
    </NFlex>
</template>

<style>
</style>