import axios from 'axios';

console.log(process.env.OPENAI_HOST)

export const HOST = process.env.OPENAI_HOST || 'dev.sophoenix.com'

export const postSignIn = (data: any): Promise<any> => {
    return new Promise((resolve, reject) => {
        const url = `http://${HOST}/login`;
        axios.post(url, data)
            .then((response : any) => {
                if (!response) {
                    reject({ status: 500 })
                    return 
                }
                resolve(response.data)
            }).catch((error: any) => {
                console.log(error)
                reject(error)
            });
    });
}

export const postCheckToken = (token: string, data: any): Promise<any> => {
    return new Promise((resolve, reject) => {
        const url = `http://${HOST}/${token}/chat/check_token`;
        axios.post(url, data)
            .then((response: any) => {
                if (!response) {
                    reject({ status: 500 })
                    return 
                }
                resolve(response.data)
            })
            .catch((error: any) => {
                reject(error)
            });
    });
}


