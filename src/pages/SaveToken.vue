<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { IRequest } from '../models';
import { handleRequest } from '../helper';
import { useWsService } from '../services/wsServiceManager';
import { useStore } from '../stores/store';

const router = useRouter();
const store = useStore();
const wsService = useWsService();


onMounted(async() => {
      store.loading = true;

      watch(() => store.isConnected, (newValue) => {
      if (newValue) {
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
                  store.loading = false;
                  
                  router.push({ name: 'EmailConfirmed' });
            }
      }
    });
});
</script>
<template>
 
</template>
<style scoped>
</style>