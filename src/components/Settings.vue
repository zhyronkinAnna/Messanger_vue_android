<script setup lang="ts">
import { NAvatar, NButton, NCard, NDivider, NFlex, NForm, NFormItemGi, NGrid, NGridItem, NH2, NIcon, NInput, NModal, NText } from 'naive-ui';
import { useStore } from '../stores/store';
import { PowerIcon } from '@heroicons/vue/24/outline';

const store = useStore();

function onCloseButtonClick()
{
    store.showSettings = false;
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
                            <NFlex>
                                <NAvatar 
                                    round
                                    :size="60"
                                    src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
                                />
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
</style>