import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyAKbkIpyiL_b1aCVOvRAEXEsddirN65qtY",
    authDomain: "easyclaim-6b8fa.firebaseapp.com",
    projectId: "easyclaim-6b8fa",
    storageBucket: "easyclaim-6b8fa.appspot.com",
    messagingSenderId: "14365921237",
    appId: "1:14365921237:web:825843d963c926fc74775c",
    measurementId: "G-BTYS0YPQKF"
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth()