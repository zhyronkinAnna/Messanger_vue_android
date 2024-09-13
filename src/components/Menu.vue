<script setup lang="ts">
import { NAvatar, NFlex, NIcon, NButton, useNotification } from 'naive-ui';
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
    <NFlex vertical class="h-100vh w-60px justify-center flex items-center bg-#FAFAFA">
        <NAvatar
            class="m-t-10px"
            round
            size="medium"
            src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
        />
        <NButton @click="onSettingsButtonClick" :bordered="false" circle size="medium" class="m-t-auto" ghost color="#898989">
            <template #icon>
                <NIcon :size="25"><Cog6ToothIcon/></NIcon>
            </template>
        </NButton>
        <NButton @click="onButtonLogoutClick" :bordered="false" circle size="medium" class="m-b-10px" ghost color="#898989">
            <template #icon>
                <NIcon :size="25"><ArrowLeftEndOnRectangleIcon/></NIcon>
            </template>
        </NButton>
    </NFlex>
</template>

<style>
</style>