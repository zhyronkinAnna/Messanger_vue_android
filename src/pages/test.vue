<script setup lang="ts">
import { NFlex, NButton, NVirtualList, VirtualListInst, NText, NSpace } from 'naive-ui';
import TextMessage from './TextMessage.vue';
import { computed, onMounted, ref } from 'vue';
import { useStore } from '../stores/store';
import { ChatMessageTypes } from '../models/ChatMessageTypesEnum';
import FileMessage from './FileMessage.vue';
import { IChatMessage, ReadTypes } from '../models';

const virtualListInst = ref<VirtualListInst>()

    const items = Array.from({ length: 10000 }, (_, i) => ({
      key: `${i}`,
      value: i,
    }))

    function handleScrollToKey() {
        virtualListInst.value?.scrollTo({ key: '88' })
      }
      function handleScrollToPosition () {
        virtualListInst.value?.scrollTo({ position: 'bottom' })
      }
      function handleScrollToIndex() {
        virtualListInst.value?.scrollTo({ index: 200 })
      }
      function handleScrollToDistance() {
        virtualListInst.value?.scrollTo({ top: 100 })
      }
</script>

<template>
    <n-space> vertical>
      <n-space>
        <n-button @click="handleScrollToKey">
          Scroll
        </n-button>
        <n-button @click="handleScrollToPosition">
          Scroll to position
        </n-button>
        <n-button @click="handleScrollToIndex">
          Scroll to index
        </n-button>
        <n-button @click="handleScrollToDistance">
          Scroll to distance
        </n-button>
      </n-space>
      <n-virtual-list
        ref="virtualListInst"
        style="max-height: 240px"
        :item-size="42"
        :items="items"
        item-resizable
      >
        <template #default="{ item, index }">
          <div class="item" style="height: 42px">
            <span> {{ index }}</span>
          </div>
        </template>
      </n-virtual-list>
    </n-space>
</template>

<style scoped>

.avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  margin-right: 10px;
}
</style>