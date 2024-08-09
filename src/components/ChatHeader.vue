<script setup lang="ts">
import { NAvatar, NButton, NFlex, NGrid, NGridItem, NIcon, NText } from 'naive-ui';
import { PhoneIcon, InformationCircleIcon } from '@heroicons/vue/24/outline';
import { useStore } from '../stores/store';

const store = useStore();

function onInfoButtonClick()
{
    store.showUserInfo = !store.showUserInfo;
}

</script>

<template>
    <NFlex class="w-full p-5px b-b-1px b-b-solid b-b-#EFEFF5 items-center">
        <NFlex>
            <NAvatar 
                round
                :size="43"
                src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
            />
        </NFlex>
        <NFlex>
            <NGrid :cols="1">
                <NGridItem>
                    <NText strong>User Name</NText>
                </NGridItem>
                <NGridItem>
                    <NText>lastSeenOnline</NText>
                </NGridItem>
            </NGrid>
        </NFlex>
        <NFlex class="m-l-auto">
            <NGrid :cols="1">
                <NGridItem class="justify-right flex">
                    <NButton :bordered="false" circle size="medium" ghost color="#007AFF">
                        <template #icon>
                            <NIcon :size="23"><PhoneIcon/></NIcon>
                        </template>
                    </NButton>
                    <NButton @click="onInfoButtonClick" :bordered="false" circle size="medium" ghost color="#898989">
                        <template #icon>
                            <NIcon :size="25"><InformationCircleIcon/></NIcon>
                        </template>
                    </NButton>
                </NGridItem>
            </NGrid>
        </NFlex>
    </NFlex>
</template>

<style>
</style>