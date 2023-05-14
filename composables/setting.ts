import { ChatSettingItem, ChatSettingOption } from "@/types";

const key = "chatSetting";
const accessTokenKey = "accessToken";

export async function saveToken(token: string) {
  localStorage.setItem(accessTokenKey, token);
}

export function loadToken(): ChatSettingItem | undefined | string {
  const token = localStorage.getItem(accessTokenKey);
  if (token) {
    return token;
  }
}


export async function saveSetting(setting: ChatSettingOption) {
  const oldSetting = loadSetting();
  if (
    oldSetting?.apiKey !== setting.apiKey ||
    oldSetting.apiKey.includes("sk-") // 处理之前明文储存 API Key 的过度方法
  ) {
    const encrypt = await $fetch("/api/crypto", {
      method: "post",
      body: { message: setting.apiKey, type: "en" },
    });
    setting.apiKey = encrypt;
  }

  localStorage.setItem(key, JSON.stringify({ ...setting }));
}

export function loadSetting(): ChatSettingItem | undefined {
  const settingString = localStorage.getItem(key);
  if (settingString) {
    return JSON.parse(settingString);
  }
}
