import { initializeApp } from "firebase/app";
import { createContext, useContext } from "react";
import "firebase/auth";
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { createUserWithEmailAndPassword, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from 'react';
import { getDatabase, set } from "firebase/database";


import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseContext = createContext(null);

const firebaseConfig = {
  apiKey: "AIzaSyDNc0l8ZgWtQLOHH_BIDUuZsLeFqvbvBuY",
  authDomain: "twitter-app-clone-90b95.firebaseapp.com",
  projectId: "twitter-app-clone-90b95",
  storageBucket: "twitter-app-clone-90b95.appspot.com",
  messagingSenderId: "665952976224",
  appId: "1:665952976224:web:ecf76e7601fe1093f8b205"
};



// Initialize Firebase instances

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const firestore = getFirestore(app);
const storage = getStorage(app);
const database = getDatabase(app);
// create and use context
export const useFirebase = () => useContext(firebaseContext);


export const FirebaseProvider = (props) => {

  const [user, setUser] = useState();
  //  console.log(user)
  useEffect(() => {


    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("User", user.uid)
        userDetail();
        setUser(user);
      }
      else {
        setUser(null);
      }
    });
  }, []);


  // const addUser=({userId, name, email, imageUrl})=>{
  //   set(ref(database, 'users/' + userId), {
  //     username: name,
  //     email: email,
  //     profile_picture : imageUrl
  //   });
  // }

  //login with google

  const handleGoogle = () => signInWithPopup(auth, provider)

  //Login with email and password

  const signInWithEmailAndPass = (email, password) => signInWithEmailAndPassword(auth, email, password)

  //SignUp with email and password

  const SignupUserWithEmailAndPassword = (email, password) => createUserWithEmailAndPassword(auth, email, password)

  const getImageURL = (path) => {
    return getDownloadURL(ref(storage, path));
  }

  const AddTweet = async (text, pic) => {

    if (pic && text.length > 0) {

      const imageRef = ref(storage, `uploads/images/${Date.now()}-${pic.name}`);
      const uploadResult = await uploadBytes(imageRef, pic);

      return await addDoc(collection(firestore, "tweets"), {
        text,
        imageURL: uploadResult.ref.fullPath,

      })

    }
    else if (pic) {

      const imageRef = ref(storage, `uploads/images/${Date.now()}-${pic.name}`);
      const uploadResult = await uploadBytes(imageRef, pic);
      return await addDoc(collection(firestore, "tweets"), {
        text: '',
        imageURL: uploadResult.ref.fullPath,

      })
    }
    else if (text.length > 0) {
      return await addDoc(collection(firestore, "tweets"), {
        text,
        imageURL: ''

      })
    }

  };


  const getTweets = () => {
    return getDocs(collection(firestore, "tweets"));
  }
  const userDetail = async () => {
    return await addDoc(collection(firestore, "user"), {

      userID: user.uid,
      userEmail: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    });
  }

  const search = async (name) => {
    const collectionRef = collection(firestore, "users");
    const q = query(collectionRef, where("displayName", "==", name));

    const result = await getDocs(q);
    return result;
  }
  const isLoggedIn = user ? true : false;

  // firebase Provider and provides fuctions through out the app::



  return (

    <firebaseContext.Provider
      value={{
        handleGoogle,
        signInWithEmailAndPass,
        SignupUserWithEmailAndPassword,
        isLoggedIn,
        AddTweet,
        getTweets,
        getImageURL,
        userDetail,
        search,
        user,
        app
      }}>
      {props.children}
    </firebaseContext.Provider>
  )
}


