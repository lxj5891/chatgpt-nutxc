export type ChatSettingType = "default" | "global" | "chat";

export interface ChatSettingItem extends ChatSettingOption {
  id: number;
}

export interface ChatSettingOption extends ChatSetting {
  type: ChatSettingType;
}

export interface ChatSetting {
  apiKey: string;
  temperature: number;
}


export interface SignInValues {
  user_no: string;
}

export interface ResMessage {
  message: string;
}