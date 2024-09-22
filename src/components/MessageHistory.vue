<script setup lang="ts">
import { NFlex, NText, NVirtualList, VirtualListInst, NButton } from 'naive-ui';
import TextMessage from './TextMessage.vue';
import { computed, onMounted, ref } from 'vue';
import { useStore } from '../stores/store';
import { ChatMessageTypes } from '../models/ChatMessageTypesEnum';
import FileMessage from './FileMessage.vue';
import { watch } from 'vue';
import { nextTick } from 'vue';

const store = useStore();

const virtualListMessagesInst = ref<VirtualListInst>();

const messagesWithDates = computed(() => {
  const messages = store.selectedChat?.messages || [];
  const result: any = [];
  let lastDate: any = null;

  messages.forEach((message) => {
    const messageDate = new Date(message.sent_at);
    const currentDate = messageDate.toDateString();

    if (lastDate !== currentDate) {
      result.push({ isDate: true, date: messageDate, key: messageDate.getTime() });
      lastDate = currentDate;
    }
    
    result.push({ ...message, isDate: false, key: message.message_id });
  });

  return result;
});

onMounted(() => {
    store.virtualListMessagesInst = virtualListMessagesInst;
    store.virtualListMessagesInst.scrollTo({ position: 'bottom' });
    
    watch(() => messagesWithDates, (newVal, oldVal) => {
        if (store.virtualListMessagesInst) {
            nextTick(() => {
                store.virtualListMessagesInst.scrollTo({ position: 'bottom' });
            });
        }
    }, { deep: true });
})

</script>

<template>
    <NVirtualList :item-size="80" :items="messagesWithDates" ref="virtualListMessagesInst" class="bg-#FAFAFA " item-resizable>
        <template #default="{ item, index }">
            <NFlex class="w-full p-t-5px p-b-5px">
                <template v-if="item.isDate">
                    <NFlex justify="center" class="w-full">
                        <NText class="flex justify-center bg-#F4F4F7 rounded-20px p-b-5px p-t-5px p-l-10px p-r-10px">
                            {{
                                new Date(item.date)
                                    .toLocaleDateString('ru-RU', {
                                    day: '2-digit',
                                    month: '2-digit',
                                    year: 'numeric',
                                })
                            }}
                        </NText>
                    </NFlex>
                </template>
                <template v-else>
                    <NFlex class="w-full p-l-10px p-r-10px">
                        <TextMessage
                            v-if="item.type === ChatMessageTypes.Text"
                            :message="item"
                            :class="item.username !== store.user?.username
                            ? 'm-r-auto rounded-br-20px rounded-tr-20px rounded-bl-20px'
                            : 'm-l-auto rounded-br-20px rounded-tl-20px rounded-bl-20px'"
                        />
                        <FileMessage
                            v-else-if="item.type === ChatMessageTypes.File"
                            :messageFile="item"
                            :class="item.username !== store.user?.username
                            ? 'm-r-auto rounded-br-20px rounded-tr-20px rounded-bl-20px'
                            : 'm-l-auto rounded-br-20px rounded-tl-20px rounded-bl-20px'"
                        />
                    </NFlex>
                </template>
            </NFlex>
        </template>
    </NVirtualList>
</template>

<style>
</style>