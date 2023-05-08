import {
  CreateChatCompletionRequest,
  CreateCompletionRequest,
  CreateImageRequest,
} from "openai";

export type ApiRequestModel = "chat" | "text" | "img";

export interface ApiRequest {
  cipherAPIKey: string;
  model: ApiRequestModel | any;
  request:
    | CreateChatCompletionRequest
    | CreateCompletionRequest
    | CreateImageRequest
    | any;
}
