import axios from 'axios';

const HOST = 'localhost:8082'

export const postSignIn = (data: any): Promise<any> => {
    return new Promise((resolve, reject) => {

        const url = `http://${HOST}/login`;
        
        axios.post(url, data)
            .then(response => {
                console.log('=====++++++++++++++++++++++= ')
                console.log(response)
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
                console.log('=====++++++++++++++++++++++= ')
                console.log(response)
                resolve(response.data)
            })
            .catch(error => {
                reject(error)
            });
    });
}


