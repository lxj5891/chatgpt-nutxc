<template>
  <div class="pt-2 border-t">
    <div
      class="bar-btn"
      v-for="item in funcs"
      :key="item.type"
      @click="clickBtn(item.type)"
    >
      <component :is="item.icon" />
      <div>{{ item.name }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Plus, Setting, Shade, Wechat, Github, Router, Target } from "@icon-park/vue-next";
import { useChatStore } from "@/stores/chat";

const store = useChatStore();
const funcs = [
  { name: "新建聊天", type: "chat", icon: Plus },
  { name: "设置", type: "setting", icon: Setting },
  { name: "套餐", type: "comboMeal", icon: Wechat },
];

async function clickBtn(type: string) {
  if (type === "chat") {
    store.createChat();
  } else if (type === "setting") {
    store.showSetting = true;
  } else if (type === "github") {
    open("https://github.com/lianginx/chatgpt-nuxt", "_blank");
  } else if (type === "comboMeal") {
    store.showComboMeal = true;
  }
}
</script>

<style scoped></style>
