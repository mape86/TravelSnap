import {
  FIREBASE_API_KEY,
  FIREBASE_APP_ID,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
} from "@env";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {
  getDownloadURL,
  getMetadata,
  getStorage,
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
const fbAuth = getAuth(app);
const fbStore = getFirestore(app);

/**
 *
 * @param {*} uri
 * @param {*} name
 * @param {*} onProgress
 * @param {*} ref
 */

const uploadImageToFirebase = async (uri, name, metadata = {}, onProgress) => {
  const user = fbAuth.currentUser;

  if (!user) {
    throw new Error("You must be loggged in to upload images to firebase");
  }

  const fetchResponse = await fetch(uri);
  const blob = await fetchResponse.blob();

  const userFolder = `users/${user.uid}/images`;
  const imageRef = ref(fbStorage, `${userFolder}/${name}`);
  console.log("uploading with metadata: ", metadata);
  const uploadTask = uploadBytesResumable(imageRef, blob, {
    customMetadata: metadata,
  });

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
        resolve({ downloadURL, metadata: uploadTask.snapshot.metadata });
        const storageRef = ref(fbStorage, `users/${user.uid}/images/${name}`);

        getMetadata(storageRef)
          .then((metadata) => {
            console.log("metadata: ", metadata);
          })
          .catch((error) => {
            console.log("error: ", error);
          });
      }
    );
  });
};

const uploadToFeed = async (uri, name, metadata = {}, onProgress) => {
  const user = fbAuth.currentUser;

  if (!user) {
    throw new Error("You must be loggged in to upload images your Feed");
  }

  const fetchResponse = await fetch(uri);
  const blob = await fetchResponse.blob();

  const imageFolder = "feed";
  const imageRef = ref(fbStorage, `${imageFolder}/${name}`);

  const uploadTask = uploadBytesResumable(imageRef, blob, {
    customMetadata: metadata,
  });

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
        resolve({ downloadURL, metadata: uploadTask.snapshot.metadata });
        const storageRef = ref(fbStorage, `feed/${name}`);

        getMetadata(storageRef)
          .then((metadata) => {
            console.log("metadata: ", metadata);
          })
          .catch((error) => {
            console.log("error: ", error);
          });
      }
    );
  });
};

const uploadProfilePicture = async (uri, name, onProgress) => {
  const user = fbAuth.currentUser;

  if (!user) {
    throw new Error("You must be logged in to upload a profile picture");
  }

  const fetchResponse = await fetch(uri);
  const blob = await fetchResponse.blob();

  const userFolder = `users/${user.uid}/profileImage`;
  const imageRef = ref(fbStorage, `${userFolder}/${name}`);

  const uploadTask = uploadBytesResumable(imageRef, blob);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      (image) => {
        const progress = (image.bytesTransferred / image.totalBytes) * 100;
        onProgress(progress);
      },
      (error) => {
        reject(error);
      },
      async () => {
        const downloadUrl = await getDownloadURL(uploadTask.image.ref);
        resolve({ downloadUrl, metadata: uploadTask.image.metadata });
      }
    );
  });
};

const getAllImagesFromFirebase = async () => {
  const user = fbAuth.currentUser;

  if (!user) {
    throw new Error("You must be loggged in to retrieve images from firebase");
  }
  try {
    const userFolder = `users/${user.uid}/images`;
    const imageRef = ref(fbStorage, `${userFolder}`);

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

const getOwnProfilePicture = async () => {
  const user = fbAuth.currentUser;

  if (!user) {
    throw new Error("You must be logged in to retrieve a profile image");
  }

  try {
    const userFolder = `users/${user.uid}/profileImage`;
    const imageRef = ref(fbStorage, `${userFolder}`);

    const result = await listAll(imageRef);
    const imageUrls = await Promise.all(
      result.items.map(async (item) => {
        const downloadURL = await getDownloadURL(item);
        return downloadURL;
      })
    );
    return imageUrls[0];
  } catch (error) {
    console.log("Error getting profile image from firebase", error);
  }
};

const getAllFeedImagesFromFirebase = async () => {
  try {
    const imageRef = ref(fbStorage, "feed");

    const result = await listAll(imageRef);
    const imageUrls = await Promise.all(
      result.items.map(async (item) => {
        const downloadUrl = await getDownloadURL(item);
        return downloadUrl;
      })
    );
    return imageUrls;
  } catch (error) {
    console.error("Error getting images from Feed", error);
    return [];
  }
};

export {
  app,
  fbAuth,
  fbStorage,
  fbStore,
  firebaseConfig,
  getAllImagesFromFirebase,
  getOwnProfilePicture,
  uploadImageToFirebase,
  uploadProfilePicture,
  uploadToFeed,
  getAllFeedImagesFromFirebase,
};
