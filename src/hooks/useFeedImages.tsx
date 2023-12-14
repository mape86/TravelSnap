import { getMetadata, ref } from "firebase/storage";
import { useEffect, useState } from "react";
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

// Created this hook to so we can reuse the logic of fetching feed images,
// since these images are both used on the frontpage/main page and the search page.

const useFeedImages = (): {
  imageObjects: ImageObject[];
  setImageObjects: React.Dispatch<React.SetStateAction<ImageObject[]>>;
  isError: boolean;
  isLoading: boolean;
  refreshList: () => Promise<void>;
} => {
  const [imageObjects, setImageObjects] = useState<ImageObject[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    fillImageObjects();
  }, []);

  const fillImageObjects = async () => {
    setIsLoading(true);
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
      })
      // Set loading to false in a "finally" block
      // since the loading will always end after the fetching is done, no matter if it went well or not.
      .finally(() => {
        setIsLoading(false);
      });
  };

  return { imageObjects, setImageObjects, isError, isLoading, refreshList: fillImageObjects };
};

export { useFeedImages };
