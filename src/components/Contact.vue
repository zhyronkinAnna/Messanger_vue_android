<script setup lang="ts">
import { NGridItem, NGrid, NAvatar, NText, NFlex, NDropdown } from 'naive-ui';
import ReadIcon from '../assets/read.svg';
import UnreadIcon from '../assets/unread.svg';
import { nextTick, ref } from 'vue';

const status = ref<boolean>(false);
const message = ref<string>('last message');
const username = ref<string>('User name');

const showDropdownRef = ref(false)
const xRef = ref(0)
const yRef = ref(0)

const activeDropdownId = ref<string | null>(null);

function handleContextMenu(e: MouseEvent, id: string) {
    e.preventDefault();
    activeDropdownId.value = id;
    showDropdownRef.value = false;
    nextTick().then(() => {
        showDropdownRef.value = true;
        xRef.value = e.clientX;
        yRef.value = e.clientY;
    });
}

function onClickoutside() {
    showDropdownRef.value = false;
    activeDropdownId.value = null;
}

function handleSelect(key: string | number) {
    showDropdownRef.value = false
}


const options = [
    {
        label: 'Jay Gatsby',
        key: 'jay gatsby'
    }
]

interface Props {
    id: string;
}

const props = defineProps<Props>();

</script>

<template>
    <NFlex 
        vertical 
        class="m-l-5px w-250px h-50px bg-white rounded-2 overflow-hidden p-l-10px p-r-10px"
        :class="{ 'hover-bg': !showDropdownRef, 'active-bg': activeDropdownId === props.id }" 
        @contextmenu="(e) => handleContextMenu(e, props.id)"
    >
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

.active-bg {
    background-color: #F4F7FF;
}
</style>
