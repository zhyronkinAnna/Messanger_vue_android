<script setup lang="ts">
import { NGridItem, NGrid, NAvatar, NText, NFlex } from 'naive-ui';
import ReadIcon from '../assets/read.svg';
import UnreadIcon from '../assets/unread.svg';
import { ref } from 'vue';

const status = ref<boolean>(false);
const message = ref<string>('last message');
const username = ref<string>('User name');

interface Props {
  id: string;
}

const props = defineProps<Props>();

</script>

<template>
    <NFlex vertical class="m-l-15px w-250px h-50px bg-white hover-bg rounded-2 overflow-hidden">
        <NGrid :cols="5" :x-gap="5" class="h-50px">
            <NGridItem class="justify-center flex items-center">
                <NAvatar 
                round
                :size="43"
                src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
                />
            </NGridItem>
            <NGridItem :span="4">
                <NFlex>
                    <NGrid :cols="8">
                        <NGridItem :span="5">
                            <NText strong>{{ username }}{{ props.id }}</NText>
                        </NGridItem>
                        <NGridItem class="justify-right flex items-center" :span="3">
                            <NText>22.12.2023</NText>
                        </NGridItem>
                        <NGridItem :span="7">
                            <NText>{{ message }}</NText>
                        </NGridItem>
                        <NGridItem class="justify-right flex items-center">
                            <ReadIcon v-if="status"/>
                            <UnreadIcon v-else/>
                        </NGridItem>
                    </NGrid>
                </NFlex>
            </NGridItem>
        </NGrid>
    </NFlex>
</template>

<style scoped>
.hover-bg {
    transition: background-color 0.3s;
}

.hover-bg:hover {
    background-color: #F4F7FF;
}
</style>
