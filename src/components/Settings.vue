<script setup lang="ts">
import { NAvatar, NButton, NCard, NDivider, NFlex, NFloatButton, NForm, NFormItemGi, NGrid, NGridItem, NH2, NIcon, NInput, NModal, NText, NUpload, UploadFileInfo, useMessage } from 'naive-ui';
import { useStore } from '../stores/store';
import { PowerIcon, CameraIcon } from '@heroicons/vue/24/outline';
import { ref } from 'vue';

const store = useStore();
const message = useMessage();
const showFloatButton = ref<boolean>(false);

function onCloseButtonClick() {
    store.showSettings = false;
}

const localUploadRef = ref<InstanceType<typeof NUpload> | null>(null);

async function onChange(options: { file: UploadFileInfo; fileList: Array<UploadFileInfo> }) {
    if (options.file.status === "pending") {
        const file = options.file.file;

        if (file) {
            const reader = new FileReader();

            reader.onload = function(event) {
                const result = event.target?.result;

                if (!result || typeof result !== 'string') {
                    console.error('Error reading file or result is not a string');
                    return;
                }

                localUploadRef.value?.clear();
                store.cropperSrc = result;
                store.showSetAvatar = !store.showSetAvatar;
            };
            reader.readAsDataURL(file);
        } else {
            console.error('File is null or undefined');
        }
    }
}


async function beforeUpload(data: { file: UploadFileInfo, fileList: UploadFileInfo[] }) {
    if (data.file.file?.type !== 'image/png' && data.file.file?.type !== 'image/jpeg' && data.file.file?.type !== 'image/jpg') {
        message.error(
            'Only upload picture files, please re-upload.'
        );
        return false
    }
    return true
}

</script>

<template>
    <NModal v-model:show="store.showSettings">
        <NCard
            class="w-400px"
            :bordered="false"
            size="huge"
            role="dialog"
            aria-modal="true"
            closable
            @close="onCloseButtonClick"
        >
            <template #header>
                <NH2>Settings</NH2>
            </template>
            <NForm>
                <NGrid :cols="24" :x-gap="10">
                    <NFormItemGi :span="24" :show-label="false">
                        <NFlex class="w-full items-center">
                            <NFlex 
                                @mouseover="showFloatButton = true"
                                @mouseleave="showFloatButton = false"
                            >
                                <NUpload
                                    :max="1"
                                    ref="localUploadRef"
                                    @before-upload="beforeUpload"
                                    @change="onChange"
                                >
                                    <NFlex>
                                        <NAvatar
                                            class="avatar-upload"
                                            round
                                            :size="60"
                                            src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
                                        />
                                        <NFloatButton 
                                            v-if="showFloatButton"
                                            position="absolute" 
                                            :width="60" 
                                            :height="60" 
                                            :theme-overrides="{ 
                                                color: '#00000070'
                                            }
                                        ">
                                            <NIcon :size="40" color="white">
                                                <CameraIcon/>
                                            </NIcon>
                                        </NFloatButton>
                                    </NFlex>
                                </NUpload>
                            </NFlex>
                            <NFlex>
                                <NGrid :cols="1">
                                    <NGridItem>
                                        <NText strong>User Name</NText>
                                    </NGridItem>
                                    <NGridItem>
                                        <NText class="text-#007AFF text-12px">email</NText>
                                    </NGridItem>
                                </NGrid>
                            </NFlex>
                        </NFlex>
                    </NFormItemGi>
                    <NFormItemGi :span="24" :show-feedback="false">
                        <template #label>
                            <NText class="text-#007AFF text-12px">Bio</NText>
                        </template>
                        <NInput 
                            :theme-overrides="{ 
                                colorFocus: '#F4F4F7', 
                                color: '#F4F4F7' 
                            }" 
                            placeholder="ex. Pizza lover" 
                            :bordered="false" 
                            class="rounded-7px"
                        />
                    </NFormItemGi>
                    <NFormItemGi :span="24" :show-feedback="false" :show-label="false">
                        <NDivider />
                    </NFormItemGi>
                    <NFormItemGi :span="12" label="First name">
                        <NInput
                            placeholder="ex. Ryan"
                            class="rounded-7px"
                        />
                    </NFormItemGi>
                    <NFormItemGi :span="12" label="Last name">
                        <NInput
                            placeholder="ex. Gosling" 
                            class="rounded-7px"
                        />
                    </NFormItemGi>
                    <NFormItemGi :span="24" label="Username">
                        <NInput 
                            placeholder="ex. Don Juan" 
                            class="rounded-7px"
                        />
                    </NFormItemGi>
                    <NFormItemGi :span="24" label="Username">
                        <NInput 
                            placeholder="example@email.com" 
                            class="rounded-7px"
                        />
                    </NFormItemGi>
                    <NFormItemGi :span="24" :show-label="false">
                        <NButton type="primary" block strong>
                            Save changes
                        </NButton>
                    </NFormItemGi>
                    <NFormItemGi :span="24" :show-feedback="false">
                        <NButton text type="primary" text-color="#FF0000" size="large">
                            <template #icon>
                                <NIcon><PowerIcon/></NIcon>
                            </template>
                            Deactivate account
                        </NButton>
                    </NFormItemGi>
                </NGrid>
            </NForm>
        </NCard>
    </NModal>
</template>

<style>
.n-upload-file-list{
    display: none !important
}
.avatar-upload {
    cursor: pointer;
}
</style>