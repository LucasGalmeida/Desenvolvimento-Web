import firebase from 'firebase';

const firebaseConfig = {     
    apiKey: "AIzaSyDave_wP-17QYr-DpwKtBOPGRRcbJXsfn0",
    authDomain: "projeto-4bfb5.firebaseapp.com",
    projectId: "projeto-4bfb5",
    storageBucket: "projeto-4bfb5.appspot.com",
    messagingSenderId: "67671260140",
    appId: "1:67671260140:web:ae2ae6454f4eeb7cde5ec9"  
};

// Initialize Firebase
export default firebase.initializeApp(firebaseConfig);