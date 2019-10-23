

import axious from 'axios';

export function signUp() {
    return {
        type: 'SIGN_UP',
        payload: {
            email: 'nahrae@gmail.com',
            token: 'asdfasdf1234jhjsdf'
        }
    }
}

export function signIn() {
    return {
        type: 'SIGN_IN',
        payload: {
            email: 'nahrae@gmail.com',
            token: 'asdfasdf1234jhjsdf'
        }
    }
}

