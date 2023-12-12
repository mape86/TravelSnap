import { getMetadata, ref } from "firebase/storage";
import { useState, useEffect } from "react";
import { fbStorage, getAllFeedImagesFromFirebase } from "../../firebaseConfig";

export interface ImageObject {
  uri: string;
  latitude?: string;
  longitude?: string;
  description?: string;
  tags?: string;
  like?: boolean;
  userName?: string;
}

const useFeedImages = (): {
  imageObjects: ImageObject[];
  isError: boolean;
  refreshList: () => Promise<void>;
} => {
  const [imageObjects, setImageObjects] = useState<ImageObject[]>([]);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    fillImageObjects();
  }, []);

  const fillImageObjects = async () => {
    const photoUrls = await getAllFeedImagesFromFirebase();

    const metadataPromises = photoUrls.map((url) => {
      const imageRef = ref(fbStorage, url);
      return getMetadata(imageRef).then((metadata) => {
        const latitude = metadata.customMetadata?.latitude;
        const longitude = metadata.customMetadata?.longitude;
        const description = metadata.customMetadata?.description || "";
        const tags = metadata.customMetadata?.tags || "";
        const userName = metadata.customMetadata?.userName || "";
        const like = !!metadata.customMetadata?.like;
        return {
          uri: url,
          latitude,
          longitude,
          description,
          tags,
          userName,
          like,
        };
      });
    });

    Promise.all(metadataPromises)
      .then((imageObjects) => {
        setImageObjects(imageObjects);
        setIsError(false);
      })
      .catch(() => {
        setIsError(true);
      });
  };

  return { imageObjects, isError, refreshList: fillImageObjects };
};

export { useFeedImages };
