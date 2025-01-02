<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { IRequest } from '../models';
import { handleRequest } from '../helper';
import { useWsService } from '../services/wsServiceManager';

const router = useRouter();
const wsService = useWsService();

function delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

onMounted(async() => {
    console.log('Начало');
    await delay(10000);
    console.log('Через 10 секунд');
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
      
    const access_token = params.get('access_token');
    const refresh_token = params.get('refresh_token');
    if(access_token && refresh_token) {
        const request: IRequest  = {
                command: "SaveToken", 
                data: {
                    access_token: params.get('access_token'),
                    refresh_token: params.get('refresh_token'),
                }
        };
        handleRequest(wsService!, request);
        
        router.push({ name: 'EmailConfirmed' });
      }
});
</script>
<template>
 
</template>
<style scoped>
</style>