<script setup lang="ts">
import { NFlex, NText } from 'naive-ui';

interface Props {
    id: string 
}

const props = defineProps<Props>();

</script>

<template>
    <NFlex align="centre">
        <NFlex vertical :size="0" class="bg-#F4F4F7 rounded-br-20px rounded-tr-20px rounded-bl-20px p-10px" justify="center">
            <NFlex class="text-17px">
                <NText>
                    testwefwefwefwefwefwef{{ props.id }}
                </NText>
            </NFlex>
            <NFlex>
                <NText class="opacity-45%">
                    22:22
                </NText>
            </NFlex>
        </NFlex>
    </NFlex>
</template>
<style>
</style>