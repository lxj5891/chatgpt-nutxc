<template>
  <div
    class="flex justify-center items-center z-10 w-full h-full bg-black bg-opacity-30"
    style="padding: 20px"
  >
    <div class="w-6/6 sm:w-2/6 bg-white rounded-lg">
      <div class="flex justify-between p-3 border-b border-slate-100">
        <div>登录</div>
        <div class="cursor-pointer" @click="store.showSignIn = false">X</div>
      </div>
      <div class="flex flex-col px-2">
        <div class="space-y-4">
          <div class="ml-2 mt-2">
            <div class="flex flex-col px-2 ml-0 mt-4 sm:ml-0 sm:px-2">
              KEY(会员号): 
            </div>
            <div class="flex flex-col rounded px-2 mt-6 ml-0 sm:ml-0 sm:px-2 border">
              <input
                type="text"
                placeholder="请输入"
                v-model.trim="account.user_no"
                style="border: 0px; outline: none;"
              />
            </div>
          </div>
          
          <div class="flex flex-col px-2 mt-6 px-2 ml-0 sm:ml-0 sm:px-2" style="color: red">
              {{ signin.message  }}
          </div>
        </div>
        <div class="flex justify-center mt-6 sm:mt-8" style="padding-bottom: 20px;">
          <button
            class="self-center text-xs sm:text-sm px-4 py-1.5 rounded-md bg-blue-700 text-white active:bg-blue-800"
            @click="postLogin()"
          >
            登录
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useChatStore } from "~/stores/chat";
import { ResMessage, SignInValues } from "@/types";

const signin = ref<ResMessage>({
  message: "",
});

const account = ref<SignInValues>({
  user_no: '',
});

const store = useChatStore();

watch(
  () => store.showSignIn,
  () => {
    if (store.showSignIn) {
      account.value.user_no = ''
    };
  },
  { flush: "post" }
);

async function postLogin() {
  signin.value.message = ''
  const complete = await $fetch("/api/signin", {
    method: "post",
    body: JSON.stringify({
      user_no: account.value.user_no,
    }),
  });
  if (complete.code == 0) {
    saveToken(complete.token)
    store.showSignIn = false
  } else {
    signin.value.message = '登录错误，请重新输入'
  }
}
</script>

<style scoped>
code {
  @apply text-[10px] sm:text-xs text-slate-700 bg-slate-100 border px-1.5 py-0.5 mx-2 rounded;
}

.form-item {
  border: 1px solid #e3e3e3;
  margin-left: 40px;
  border-radius: 4px;
  margin-top: 10px;
}
</style>
