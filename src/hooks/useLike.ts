import { getAuth } from "firebase/auth";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

interface UseLikeImageProps {
  imageIdPath: string;
}

// Make the logic of liking an image in a hook to make it reusable
// since it's used both on the feed page and the photo detail page.

const useLikeImage = ({ imageIdPath }: UseLikeImageProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState<number>(0);
  const scale = useSharedValue(1);

  const auth = getAuth();
  const user = auth.currentUser;

  const resetScale = () => {
    scale.value = withSpring(1);
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const fetchLikes = async () => {
    const firestore = getFirestore();
    const imageAttributesCollection = collection(
      firestore,
      "ImageAttributes",
      imageIdPath,
      "likes"
    );

    try {
      const q = query(imageAttributesCollection);
      const querySnapshot = await getDocs(q);

      setLikeCount(querySnapshot.docs.length);

      if (user) {
        const userLikeDoc = await getDoc(doc(imageAttributesCollection, user.uid));
        setIsLiked(userLikeDoc.exists());
      }
    } catch (error) {
      console.error("Error fetching likes:", error);
    }
  };

  useEffect(() => {
    fetchLikes();
  }, []);

  const setLike = async () => {
    if (!user) {
      return;
    }

    setIsLiked(true);
    scale.value = withSpring(1.2, {}, () => {
      runOnJS(resetScale)();
    });
    try {
      const firestore = getFirestore();
      const userId = user.uid;

      const likeRef = doc(firestore, "ImageAttributes", imageIdPath, "likes", userId);

      await setDoc(likeRef, { like: true });
      console.log("Image liked successfully");
    } catch (error) {
      setIsLiked(false);
      console.error("Error liking image:", error);
    }
  };

  const unsetLike = async () => {
    if (!user) {
      return;
    }

    setIsLiked(false);
    try {
      const firestore = getFirestore();
      const userId = user.uid;

      const likeRef = doc(firestore, "ImageAttributes", imageIdPath, "likes", userId);

      await deleteDoc(likeRef);
      console.log("Image disliked successfully");
    } catch (error) {
      setIsLiked(true);
      console.error("Error disliking image:", error);
    }
  };

  const toggleLike = async () => {
    if (isLiked) {
      await unsetLike();
    } else {
      await setLike();
    }
  };

  return {
    isLiked,
    likeCount,
    fetchLikes,
    toggleLike,
    animatedStyle,
  };
};

export { useLikeImage };
