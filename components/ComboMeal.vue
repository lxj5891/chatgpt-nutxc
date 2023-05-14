<template>
  <div
    class="flex justify-center items-center z-10 w-full h-full bg-black bg-opacity-30"
  >
    <div class="w-5/6 sm:w-3/6 bg-white rounded-lg">
      <div class="flex justify-between p-3 sm:p-4 border-b border-slate-100">
        <div>套餐</div>
        <div class="cursor-pointer" @click="store.showComboMeal = false">X</div>
      </div>
      <div class="flex flex-col px-2 sm:px-6 py-6">
        <div class="space-y-4">
          <div>
            <div class="flex flex-col px-2 sm:px-6 py-6">
              请使用微信扫码
            </div>
            <div class="flex flex-col px-2 sm:px-6 py-6">
              <div class="flex">
                <div class="flex-col px-4">
                  <div style="text-align: center;">体验版入口</div>
                  <img style="width: 230px;height: 230px;"
                      src="https://fuint-app-beijing-hangzhou.oss-cn-beijing.aliyuncs.com/uploads/20230513/oQhxR41zvsP_kmvXAuFz_0p4Bdho.jpg"
                  />
                </div>
                <div class="flex-col">
                  <div style="text-align: center;">公众号入口</div>
                  <img style="width: 230px;height: 230px;"
                      src="https://fuint-app-beijing-hangzhou.oss-cn-beijing.aliyuncs.com/qrcode_for_gh_2286a07e6d55_258.jpg"
                  />
                </div>
              </div>
            </div>
            <div class="flex flex-col px-2 sm:px-6 py-6">
              内测阶段请联系管理员 添加体验用户 <br/>
              邮件发送到： lingfeng8848@hotmail.com, 请留下您的手机号， 微信号
            </div>
          </div>
        </div>
        <div class="flex justify-center mt-6 sm:mt-8">
          <button
            class="self-center text-xs sm:text-sm px-4 py-1.5 rounded-md bg-blue-700 text-white active:bg-blue-800"
            @click="store.showComboMeal = false"
          >
            取消
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useChatStore } from "~/stores/chat";
import { SignInValues } from "@/types";

let account = ref<SignInValues>({
  account: "",
  password: "",
});

const store = useChatStore();

async function postLogin() {
  console.log(account.value)
  const complete = await $fetch("/api/signin", {
    method: "post",
    body: JSON.stringify({
      account: account.value.account,
      password: account.value.password,
    }),
  });

  account = ref<SignInValues>({
    account: "",
    password: "",
  });

  console.log(complete)
}
</script>

<style scoped>
code {
  @apply text-[10px] sm:text-xs text-slate-700 bg-slate-100 border px-1.5 py-0.5 mx-2 rounded;
}
</style>
