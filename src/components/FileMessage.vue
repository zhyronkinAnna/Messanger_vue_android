<script setup lang="ts">
import { NButton, NDropdown, NFlex, NIcon, NText } from 'naive-ui';
import UnreadIcon from '../assets/unread.svg';
import ReadIcon from '../assets/read.svg';
import { IChatMessage, ReadTypes } from '../models';
import { useStore } from '../stores/store';
import { DocumentTextIcon } from '@heroicons/vue/24/solid';
import { nextTick, ref } from 'vue';

const store = useStore();

const xRef = ref(0);
const yRef = ref(0);
const showDropdownRef = ref(false);
const activeDropdownId = ref<number | null>(null);

const options = [
    {
        label: 'Delete Message',
        key: 'delete_message'
    }
]

function handleSelect(key: string | number) {
    showDropdownRef.value = false
}

function handleContextMenu(e: MouseEvent, id: number) {
    if(props.messageFile.username === store.user?.username){
        e.preventDefault();
        activeDropdownId.value = id;
        showDropdownRef.value = false;
        nextTick().then(() => {
            showDropdownRef.value = true;
            xRef.value = e.clientX;
            yRef.value = e.clientY;
        });
    }
}

function onClickoutside() {
    showDropdownRef.value = false;
    activeDropdownId.value = null;
}

interface Props {
    messageFile: IChatMessage
}

const props = defineProps<Props>();
</script>

<template>
    <NFlex vertical :size="0" class="bg-#F4F4F7 p-10px" justify="center" @contextmenu="(e) => handleContextMenu(e, props.messageFile.message_id)">
        <NDropdown
            placement="bottom-start"
            trigger="manual"
            :x="xRef"
            :y="yRef"
            :options="options"
            :show="showDropdownRef"
            :on-clickoutside="onClickoutside"
            @select="handleSelect"
        />
        <NFlex align="center">
            <NFlex align="center" justify="center" class="w-50px h-50px rounded-8px bg-#DCE8F5">
                <NIcon :size="40"  color="#007AFFFF"><DocumentTextIcon/></NIcon>
            </NFlex>
            <NFlex vertical :size="0">
                <NFlex>
                    <NText strong class="text-15px">
                        {{ props.messageFile.file_title }}
                    </NText>
                </NFlex>
                <NFlex>
                    <NText>
                        1KB
                    </NText>
                    <NButton text tag="a" text-color="#007AFFFF">
                        Save
                    </NButton>
                </NFlex>
            </NFlex>
        </NFlex>
        <NFlex :size="0" :class="{ 'm-l-auto': props.messageFile.username === store.user?.username }" align="center">
            <ReadIcon v-if="props.messageFile.is_read === ReadTypes.Read" class="p-r-5px"/>
            <UnreadIcon v-else-if="props.messageFile.is_read === ReadTypes.Unread" class="p-r-5px"/>
            <NText class="opacity-45%">
                {{ 
                    new Date(props.messageFile.sent_at)
                    .toLocaleTimeString('ru-RU', {
                        hour: '2-digit',
                        minute: '2-digit',
                    }) 
                }}
            </NText>
        </NFlex>
    </NFlex>
</template>
<style>
</style>