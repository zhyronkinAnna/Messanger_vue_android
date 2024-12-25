<script setup lang="ts">
import { NButton, NDivider, NFlex, NModal, useNotification } from 'naive-ui';
import { onMounted, ref } from 'vue';
import { Cropper, CircleStencil } from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css';
import { useStore } from '../stores/store';
import { IRequest } from '../models';
import { handleError, handleRequest } from '../helper';
import { useWsService } from '../services/wsServiceManager';

const cropperRef = ref<any | null>(null);
const isImageReady = ref<boolean>(false);
const store = useStore();

const notification = useNotification();
const wsService = useWsService();

function onImageReady()
{
    isImageReady.value = true;
}

async function onSetPhotoButtonClick() {
    if (cropperRef.value) {
        const result = cropperRef.value.getResult();
        
        if (result?.canvas) {
            const imageBase64 = result.canvas.toDataURL('image/png');
            const request: IRequest  = {
                command: "SetAvatar", 
                data: {
                    user_id: store.user?.id,
                    image: imageBase64
                }
            };

            onCancleButtonClick();
            store.loading = true;

            const respond = await handleRequest(wsService!, request);

            if (respond?.errorMessage) {
                handleError({ subject: "Sign in Error", body: respond?.errorMessage }, notification);
            }
            store.user = {avatar_url: (respond?.data as any)?.avatar_url ?? ''}

            store.loading = false;
        }
    }
}

function onCancleButtonClick() {
    store.showSetAvatar = false;
    isImageReady.value = false;
}

onMounted(() => {
    const cropperElements = document.querySelectorAll('.your-cropper-selector [aria-hidden="true"][tabindex="0"]');
    cropperElements.forEach((el) => {
        el.setAttribute('inert', '');
        el.removeAttribute('tabindex');
    });
});

</script>

<template>
    <NModal v-model:show="store.showSetAvatar">
        <NFlex class="h-100vh w-100vw bg-black bg-opacity-50 backdrop-blur" align="center" justify="center">
            <NFlex class="h-200px w-1000px" align="center" justify="center" vertical>
                <Cropper
                    ref="cropperRef"
                    :src="store.cropperSrc"
                    :stencil-component="CircleStencil"
                    class="min-w-400px min-h-400px"
                    @ready="onImageReady"
                />
                <NFlex v-if="isImageReady" class="m-t-50px bg-#232722 p-12px rounded-5px">
                    <NFlex justify="space-between" class="w-150px">
                        <NButton text color="#FFF" @click="onCancleButtonClick">
                            Cancel
                        </NButton>
                        <NDivider vertical/>
                        <NButton text @click="onSetPhotoButtonClick" type="info">
                            Set photo
                        </NButton>
                    </NFlex>
                </NFlex>
            </NFlex>
        </NFlex>
    </NModal>
</template>

<style >
</style>