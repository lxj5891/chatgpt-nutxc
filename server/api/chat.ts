import { H3Event } from "h3";
import {
  CreateChatCompletionRequest,
  CreateCompletionRequest,
  CreateImageRequest,
} from "openai";

import { OpenAIApi, Configuration } from "openai";
import { aesCrypto } from "@/server/api/crypto";
import { AxiosRequestConfig } from "axios";
import { ApiRequest } from "@/types";
import { HOST, postSignIn, postCheckToken } from "@/utils/postSignin"

export default defineEventHandler(async (event) => {
  try {
    const body = (await readBody(event)) as ApiRequest;
    const complete: any = await hiOpenAPI(body);
    setResStatus(event, complete.status, complete.statusText);
    return complete.data;
  } catch (e: any) {
    // 很奇怪，在我的 mac 开发环境中报错时，response 永远是一个 Stream 对象
    // 但是在 Windows 开发环境和 Docker 中报错时，response 却是 undefined
    console.log('xxxxxxxxxxxxxxxxxxxxxxxx')
    console.log(e.response.status)
    if (e.response.status == 401) {
      // setResStatus(event, 401, 'NoUser');
      return new Error('401');
    }
    if (e.response?.data) {
      setResStatus(event, e.response.status, e.response.data.statusText);
      let isStreamNull = true; // mac 开发环境中上，response 永远不是 undefined
      for await (const data of e.response.data) {
        isStreamNull = false;
        const message = data.toString();
        try {
          const parsed = JSON.parse(message);
          return parsed;
        } catch (error) {
          return message;
        }
      }
      if (isStreamNull) {
        return e;
      }
    } else {
      return e;
    }
  }
});

async function hiOpenAPI(body: ApiRequest) {
  const { model, request, accessToken } = body;
  const openai = new OpenAIApi(new Configuration({
    apiKey: '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',
    basePath: `http://${HOST}/${accessToken}`,
  }));

  const requestConfig: any = {
    responseType: "stream",
    timeout: 1000 * 30,
    timeoutErrorMessage: "**网络连接超时，请重试**",
  };

  switch (model) {
    case "chat":
      return openai.createChatCompletion(
        request as CreateChatCompletionRequest,
        requestConfig
      );
    case "text":
      return openai.createCompletion(
        request as CreateCompletionRequest,
        requestConfig
      );
    case "img":
      return openai.createImage(request as CreateImageRequest, requestConfig);
  }
}

function setResStatus(event: H3Event, code: number, message: string) {
  event.node.res.statusCode = code;
  event.node.res.statusMessage = message;
}
