import { FirebaseOptions, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';



const firebase = process.env.FIREBASE as FirebaseOptions; 

const app = initializeApp(firebase);

export const auth = getAuth(app);
