<template>
  <div class="flex flex-col p-6 space-y-6">
    <div>
      <label class="space-x-3">
        <span>温度</span><span style="margin-left: 20px;"> {{ setting.temperature }}</span>
      </label>
      <input
        type="range"
        v-model.number="setting.temperature"
        min="0"
        max="2"
        step="0.1"
      />
    </div>
    <div class="space-x-3">
      <button class="main-button" @click="save">保存</button>
      <button class="second-button" @click="store.showSetting = false">
        返回
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ChatSettingOption } from "@/types";
import { useChatStore } from "~/stores/chat";

const store = useChatStore();
const setting = ref<ChatSettingOption>({
  apiKey: "",
  temperature: 1,
  type: "global",
});

onMounted(() => {
  setting.value = loadSetting() ?? setting.value;
});

async function save() {
  store.showSetting = false;
  await saveSetting(setting.value);
  await store.openChat(store.chats[0]);
}

</script>

<style scoped>
label {
  @apply block mb-2 text-sm font-medium text-gray-900;
}

input[type="password"],
input[type="text"] {
  @apply bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5;
}

input[type="range"] {
  @apply w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer;
}

button {
  @apply font-medium rounded-lg text-sm px-5 py-2.5 text-center;
}

.main-button {
  @apply text-white bg-blue-700 hover:bg-blue-800;
}

.second-button {
  @apply bg-white text-gray-900 hover:bg-gray-50 border shadow-sm;
}
</style>
