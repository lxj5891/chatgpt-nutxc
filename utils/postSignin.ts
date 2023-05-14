import axios from 'axios';
export const HOST = '192.169.110.23'
export const postSignIn = (data: any): Promise<any> => {
    return new Promise((resolve, reject) => {
        const url = `http://${HOST}/login`;
        axios.post(url, data)
            .then(response => {
                if (!response) {
                    reject({ status: 500 })
                    return 
                }
                resolve(response.data)
            }).catch(error => {
                console.log(error)
                reject(error)
            });
    });
}

export const postCheckToken = (token: string, data: any): Promise<any> => {
    return new Promise((resolve, reject) => {
        const url = `http://${HOST}/${token}/chat/check_token`;
        axios.post(url, data)
            .then(response => {
                if (!response) {
                    reject({ status: 500 })
                    return 
                }
                resolve(response.data)
            })
            .catch(error => {
                reject(error)
            });
    });
}


