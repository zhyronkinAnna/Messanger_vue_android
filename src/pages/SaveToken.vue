<script setup lang="ts">
import { onMounted } from 'vue';
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
      console.log('SaveToken mounted');
      
      while (!store.isConnected) {
            await new Promise((resolve) => setTimeout(resolve, 1000));
      }

      if (store.isConnected) {
            const href = window.location.href;
            const hashIndex = href.indexOf('#');
            const paramsIndex = href.indexOf('#', hashIndex + 1);
            
            const paramsString = href.substring(paramsIndex + 1);
            const params = new URLSearchParams(paramsString);

            const access_token = params.get('access_token');
            const refresh_token = params.get('refresh_token');
            
            console.log('access_token', access_token);
            
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
</script>
<template>
 
</template>
<style scoped>
</style>