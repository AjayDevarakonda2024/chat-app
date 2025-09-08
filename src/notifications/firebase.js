// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging,  getToken} from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyCpEfUV8L8RiRUST-NiSNM5fJZuGTsJjSI",
  authDomain: "push-notifications-be506.firebaseapp.com",
  projectId: "push-notifications-be506",
  storageBucket: "push-notifications-be506.firebasestorage.app",
  messagingSenderId: "261901199823",
  appId: "1:261901199823:web:82da6e41baea0fd30ecaba",
  measurementId: "G-G54V2R3C1R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

export const generateToken = async ()=>{
    const permission = await Notification.requestPermission();
    console.log(permission);
    if(permission === "granted"){
        const token = await getToken(
            messaging,
            {
                vapidKey: "BIIO5HUAd__IoXn4BS-LpG534s-RpiiDPvtGXLKsZsr-7fKS-QK2vEDikAF1XeBAu8B8PH6ECg2xr0lPnDSxLNQ"
            }
        )
        console.log(token)
        return token;   
    }
}
