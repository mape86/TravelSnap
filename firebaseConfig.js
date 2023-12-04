import {
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_APP_ID,
} from "@env";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  getStorage,
  getDownloadURL,
  listAll,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const fbStorage = getStorage(app);

/**
 *
 * @param {*} uri
 * @param {*} name
 * @param {*} onProgress
 * @param {*} ref
 */

const uploadImageToFirebase = async (uri, name, onProgress, ref) => {
    const fetchResponse = await fetch(uri);
    const blob = await fetchResponse.blob();

    const imageRef = ref(fbStorage, `images/${name}`);

    const uploadTask = uploadBytesResumable(imageRef, blob);

    return new Promise((resolve, reject) => {
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                onProgress(progress);
            },
            (error) => {
                reject(error);
            },
            async () => {
                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                resolve({downloadURL, metadata: uploadTask.snapshot.metadata});
            }
        )
    })
}

const getAllImagesFromFirebase = async () => {
    try {
      const imageRef = ref(fbStorage, "images")
  
      const result = await listAll(imageRef);
      const imageUrls = await Promise.all(
        result.items.map(async (item) => {
          const downloadUrl = await getDownloadURL(item);
          return downloadUrl;
        })
      );
      return imageUrls;
    } catch (error) {
      console.error("Error getting images from the firebase storage", error);
      return [];
    }
  };

  export {
    app, fbStorage, firebaseConfig, uploadImageToFirebase, getAllImagesFromFirebase
  }