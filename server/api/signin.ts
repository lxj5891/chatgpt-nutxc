import { H3Event } from "h3";
import { ApiSignInRequest } from "@/types"
import { postSignIn, postCheckToken } from "@/utils/postSignin"

export default defineEventHandler(async (event) => {
  try {
    const body = (await readBody(event)) as ApiSignInRequest;
    const complete: any = await hiSigin(body);

    setResStatus(event, complete.status, complete.statusText);
    return complete.data;
  } catch (e: any) {
    // 很奇怪，在我的 mac 开发环境中报错时，response 永远是一个 Stream 对象
    // 但是在 Windows 开发环境和 Docker 中报错时，response 却是 undefined
    return e;
  }
});

async function hiSigin(body: ApiSignInRequest) {
  console.log(body)
  const complete:any = {}
  complete.status = 200, complete.statusText = 'true'
  let res : any =  {}

  try {
    res = await postSignIn({
        user_no: body.user_no,
    })
  } catch(e) {
    console.log(e)
  }
  
  let jsonData: any = res
  if (jsonData.code == '200') {
    complete.data = {
        user_no: body.user_no,
        token: jsonData.data,
        code: 0,
    }
  } else {
    complete.data = {
        code: 2,
    }
  }
  return complete
}
  

function setResStatus(event: H3Event, code: number, message: string) {
  event.node.res.statusCode = code;
  event.node.res.statusMessage = message;
}
